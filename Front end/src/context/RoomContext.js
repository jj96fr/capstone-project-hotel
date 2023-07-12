import React, { createContext, useEffect, useState } from "react";
// data
import { roomData } from "../data";
// create context
export const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState(roomData);
  // console.log (rooms);
  // console.log(roomData);
  const [adults, setAdults] = useState("1 Adult");
  const [kids, setKids] = useState("0 Kids");
  //console.log(`adults ${adults}, kids ${kids}`);
  const [total, setTotal] = useState(0);
  //console.log(Number (adults[0]));
  //console.log(Number(kids[0]));
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTotal(Number(adults[0]) + Number(kids[0]));
  });
  // console.log(total);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(total);
    // console.log(rooms);
    // filter rooms
    const newRooms = roomData.filter(room => {
      return total <= room.maxPerson
    }, 3000);
    setTimeout(() => {
      setRooms(newRooms);
      setLoading(false);
    })
  };

  return (
    <RoomContext.Provider value={{ rooms, adults, setAdults, kids, setKids, handleClick, loading }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
