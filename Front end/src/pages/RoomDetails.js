import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { reserveARoom } from "../services/HotelService";

//components
import AdultsDropdown from "../components/AdultsDropdown";
import CheckIn from "../components/CheckIn";
import CheckOut from "../components/CheckOut";
import KidsDropdown from "../components/KidsDropdown";

//context
import { RoomContext } from "../context/RoomContext";

//icons
import { FaCheck } from "react-icons/fa";

//scroll top
import ScrollToTop from "../context/RoomContext";

//loader
import { SpinnerDotted } from 'spinners-react';

const formatDateToDDMMYYYY = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

const RoomDetails = () => {
  const { rooms, adults, kids } = useContext(RoomContext);
  const { id } = useParams();

  const room = rooms.find((room) => {
    return room.id === Number(id);
  });

  // destructure room
  const { name, description, facilities, imageLg, price } = room;

  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);
  const [loading, setLoading] = useState(false);

  // to sumbit reservation details
  const handleBookNow = async () => {
    // parse dates
    const formattedStartDate = formatDateToDDMMYYYY(startDate).toString();
    const formattedEndDate = formatDateToDDMMYYYY(endDate).toString();
    // open loading
    setLoading(true);
    // call service function
    await reserveARoom({
      roomId: id,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      adults: parseInt(adults.split(" ")[0]),
      kids: parseInt(kids.split(" ")[0]),
      price: price,
      name: name,
      payment: false
    });
    // close loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    // reload
    window.location.reload();
  }


  return (
    <section className="">
      {/*spinner*/}
      {loading && (
        <div className='h-screen fixed bottom-0 top-0 bg-black/90 w-full z-50 flex justify-center items-center'>
          <SpinnerDotted color='white' />
        </div>
      )}
      <ScrollToTop />
      {/* banner*/}
      <div className="bg-room bg-cover bg-center h-[560px] relative flex justify-center items-center">
        {/*oveerlay*/}
        <div className="absolute w-full h-full bg-black/70"></div>
        {/*title*/}
        <h1 className="text-6xl text-white z-20 font-primary text-center">
          {name}
        </h1>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row h-full py-24">
          {/*left*/}
          <div className="w-full h-full lg:w-[60%] px-6 ">
            <h2 className="h2">{name}</h2>
            <p className='mb-8'>{description}</p>
            <img className="mb-8" src={imageLg} alt='' />
            {/*facilities*/}
            <div className="mt-12">
              <h3 className="h3 mb-3">Room Facilities</h3>
              <p className="mb-12"></p>
              <div className="grid grid-cols-3 gap-6 mb-12">
                {facilities.map((item, index) => {
                  // destructure item
                  const { name, icon } = item;
                  return <div className="flex items-center gap-x-3 flex-1" key={index}>
                    <div className="text-3xl text-accent">{icon} </div>
                    <div className=" text-base">{name} </div>
                  </div>
                })}
              </div>
            </div>
          </div>
          {/* right*/}
          <div className="w-full h-full lg:w-[40%]">
            {/* reservation*/}
            <div className="py-8 px-6  bg-accent/20 mb-12">
              <div className="flex flex-col space-y-4 mb-4">
                <h3>Your Reservation</h3>
                <div className="h-[60px]">
                  <CheckIn setStartDate={setStartDate} startDate={startDate} />
                </div>
                <div className="h-[60px]">
                  <CheckOut setEndDate={setEndDate} endDate={endDate} />
                </div>
                <div className="h-[60px]">
                  <AdultsDropdown />
                </div>
                <div className="h-[60px]">
                  <KidsDropdown />
                </div>

              </div>
              {/*Button is disabled until dates are set*/}
              <button className="btn btn-lg btn-primary w-full" disabled={!startDate || !endDate} onClick={handleBookNow}> Book now from €{price}</button>
            </div>
            {/* rules*/}
            <div>
              <h3 className="h3">Hotel Rules</h3>
              <p className="mb-6">
              </p>
              <ul className="flex flex-col gap-y-4">
                <li className="flex items-center gap-x-4">
                  <FaCheck className="text-accent" />
                  Check-in: 11:00 AM - 9:00 PM
                </li>
                <li className="flex items-center gap-x-4">
                  <FaCheck className="text-accent" />
                  Check-out: 10:00 AM
                </li>
                <li className="flex items-center gap-x-4">
                  <FaCheck className="text-accent" />
                  No Smoking
                </li>
                <li className="flex items-center gap-x-4">
                  <FaCheck className="text-accent" />
                  Only small size pets
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomDetails;
