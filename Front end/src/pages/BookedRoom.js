import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

//context
import { RoomContext } from "../context/RoomContext";

//icons
import { FaCheck } from "react-icons/fa";

//scroll top
import ScrollToTop from "../context/RoomContext";

// complete payment function
import { completePayment } from "../services/HotelService";


const BookedRoom = () => {
  const { rooms } = useContext(RoomContext);
  const { id } = useParams();

  // use sate hooks
  const [payementForm, setPaymentForm] = useState(false);
  const [selectedOption, setSelectedOption] = useState('credit-card');
  const [cardType, setCardType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCVV] = useState('');
  const [email, setEmail] = useState('');

  // handler function for inputs
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handlePaymentForm = () => {
    setPaymentForm(true);
  }
  const handleCardTypeChange = (event) => {
    setCardType(event.target.value);
  };
  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };
  const handleCVVChange = (event) => {
    setCVV(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePayNow = () => {
    if (selectedOption === 'credit-card') {
      if (cardNumber.length = 16 && cardType.length > 0 && cvv.length == 3) {
        handleCompletePayment();
      } else {
        alert("Invalid Credit Information")
      }
    }
    else if (selectedOption === 'paypal') {
      if (email.length > 0) {
        handleCompletePayment();
      } else {
        alert("Invalid Paypal Email")
      }
    }
  }

  const room = rooms.find((room) => {
    return room.id === Number(id);
  });

  // destructure room
  const { name, description, facilities, imageLg, price } = room;

  // get reseravtion details from the local storage
  const storedObject = localStorage.getItem('reservedRoom');
  const reservedRoom = JSON.parse(storedObject);
  // destructure room details
  let { startDate, endDate, adults, kids, payment } = reservedRoom
  payment = JSON.parse(payment);

  // to complete the payment
  const handleCompletePayment = async () => {
    // call the service funtion
    await completePayment(reservedRoom.id);
    // set payment true
    reservedRoom.payment = true;
    // save back in the local storage
    localStorage.setItem('reservedRoom', JSON.stringify(reservedRoom));
    // reload the page
    window.location.reload();
  }

  return (
    <section className="">
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

            {/* reservation details*/}
            <div className="py-8 px-6  bg-accent/20 mb-12">
              <div className="flex flex-col space-y-4 mb-4">
                <h3 className="font-bold">Your Room Reservation Details</h3>
                <hr />
                {
                  // payment details
                  !payementForm ?
                    <>
                      <div className="h-[30px]">
                        Check In: {startDate}
                      </div>
                      <div className="h-[30px]">
                        Check Out: {endDate}
                      </div>
                      <div className="h-[30px]">
                        Adults: {adults}
                      </div>
                      <div className="h-[30px]">
                        Kids: {kids}
                      </div>
                      <div className="h-[30px]">
                        Price: €{price}
                      </div>
                      {!payment && <button className="btn btn-lg btn-primary w-full h-[60px]" onClick={handlePaymentForm}>Complete the payment of €{price}</button>}
                      {payment && <button className="btn btn-lg btn-primary w-full h-[60px]" disabled >Payment Completed</button>}
                    </>
                    :
                    // payment form
                    <>
                      <div className="h-[60px]">
                        <label className="block mb-2 font-bold">Payment Method:</label>
                        <div className="flex items-center mb-4">
                          <label className="mr-2">
                            <input
                              type="radio"
                              value="credit-card"
                              checked={selectedOption === 'credit-card'}
                              onChange={handleOptionChange}
                              className="mr-1"
                            />
                            Credit Card
                          </label>
                          <label>
                            <input
                              type="radio"
                              value="paypal"
                              checked={selectedOption === 'paypal'}
                              onChange={handleOptionChange}
                              className="mr-1"
                            />
                            PayPal
                          </label>
                        </div>
                      </div>
                      <div>
                        {
                          // crdit card info
                          selectedOption === 'credit-card' ?
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="cardType" className="block font-bold mb-2">
                                  Credit Card Type:
                                </label>
                                <select
                                  id="cardType"
                                  value={cardType}
                                  onChange={handleCardTypeChange}
                                  className="border border-gray-400 p-2"
                                >
                                  <option value="">Select Card Type</option>
                                  <option value="visa">Visa</option>
                                  <option value="mastercard">Mastercard</option>
                                  <option value="amex">American Express</option>
                                </select>
                              </div>
                              <div>
                                <label htmlFor="cardNumber" className="block font-bold mb-2">
                                  Credit Card Number:
                                </label>
                                <input
                                  type="text"
                                  id="cardNumber"
                                  value={cardNumber}
                                  onChange={handleCardNumberChange}
                                  className="border border-gray-400 p-2"
                                />
                              </div>
                              <div>
                                <label htmlFor="cvv" className="block font-bold mb-2">
                                  CVV:
                                </label>
                                <input
                                  type="text"
                                  id="cvv"
                                  value={cvv}
                                  onChange={handleCVVChange}
                                  className="border border-gray-400 p-2"
                                />
                              </div>
                            </div> :

                            // paypal info
                            <div>
                              <label htmlFor="cvv" className="block font-bold mb-2">
                                Paypal email address:
                              </label>
                              <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                className="border border-gray-400 p-2"
                              />
                            </div>
                        }
                      </div>
                      {/* paynow button */}
                      <button className="btn btn-lg btn-primary w-full h-[60px]" onClick={handlePayNow}>Pay Now</button>
                    </>
                }
              </div>
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

export default BookedRoom;
