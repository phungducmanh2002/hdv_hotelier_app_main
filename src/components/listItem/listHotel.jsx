// HorizontalList.js

import React from "react";
import HotelItem from "../item/hotelItem";

const ListHotel = ({ hotels }) => {
  
  return (
    <div className="flex items-center justify-center">
      {hotels.map((hotel, index) => (
        <HotelItem key={index} hotel={hotel} />
      ))}
    </div>
  );
};

export default ListHotel;
