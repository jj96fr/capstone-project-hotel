import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//logo
import LogoWhite from "../assets/img/logo-white.svg";
import LogoDark from "../assets/img/logo-dark.svg";

import Modal from "./Modal";

import { getAllReservations } from "../services/HotelService";

const Header = () => {
  const navigate = useNavigate();

  const [header, setHeader] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [numberOfRooms, setNumberOfRooms] = useState(0);
  const [reservedRooms, setReservedRooms] = useState([]);

  // opens the Modal
  const openModal = () => {
    window.scrollBy(0, 100);
    setModalOpen(true);
  };

  // closes tthe Modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // to ridirect the page to Reservation Details Page
  const openBookedPage = (index) => {
    // get correct room
    setModalOpen(false);
    const room = reservedRooms[index];
    // save in the local storage
    localStorage.setItem('reservedRoom', JSON.stringify(room));
    // navigate
    navigate(`/booked/${room.roomId}`);
  }

  // load all reseravtions on load
  useEffect(() => {
    const fetch = async () => {
      // call service method to fetch all reservations
      const reservations = await getAllReservations();
      // set number of reservations
      setNumberOfRooms(reservations.length);
      // set reservations
      setReservedRooms(reservations);
    }

    fetch();

  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setHeader(true) : setHeader(false);
    });
  });

  return (
    <header
      className={`${header ? "bg-white py-6 shadow-lg" : "bg-transparent py-8"
        } fixed z-50 w-full transition-all duration-300`}
    >
      <div className="container mx-auto flex flex-col items-center gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0">
        {/*logo*/}
        <Link to="/">
          {header ? (
            <img className="w-[160px]" src={LogoDark} alt="Logo" />
          ) : (
            <img className="w-[160px]" src={LogoWhite} alt="Logo" />
          )}
        </Link>
        {/* navbar*/}
        <nav
          className={`${header ? "text-primary" : "text-white"
            } flex gap-x-4 font-tertiary traking-[3px] text-[15px] items-center uppercase lg:gap-x-8`}
        >
          <Link to="/" className="hover:text-accent transition">
            Home
          </Link>
          <Link to="" className="hover:text-accent transition">
            Rooms
          </Link>
          <Link to="/spa" className="hover:text-accent transition">
            SPA
          </Link>
          <Link to="/contact" className="hover:text-accent transition">
            Contact
          </Link>
          <Link onClick={openModal} className="hover:text-accent transition">
            My Reservations ({numberOfRooms})
          </Link>


          {/*Modal show a list of reseravtions*/}
          <Modal isOpen={modalOpen} onClose={closeModal}>
            {numberOfRooms > 0 ? (
              <>
                <h1 className="text-3xl">Your Reservation List<br /><br /></h1>
                <ol>
                  {reservedRooms.map((room, index) => (
                    <li className="text-2xl" key={index}>{index + 1}. <button onClick={() => openBookedPage(index)}>{room.name}</button></li>
                  ))}
                </ol>
              </>
            ) : (
              "NO ROOMS BOOKED YET"
            )}
          </Modal>


        </nav>
      </div>
    </header>
  );
};

export default Header;

