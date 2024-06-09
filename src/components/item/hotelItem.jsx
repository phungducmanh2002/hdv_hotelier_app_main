// HotelItem.js

import React from 'react';
import Link from 'next/link';
const HotelItem = ({ hotel }) => {
  return (
    <div className="border-2 rounded-md bg-white mr-4 w-48 p-2">
      <p>{hotel.hotelName}</p>
      <p>Id: {hotel.id}</p>
      <p>Điện thoại: {hotel.phoneNumber}</p>
      <Link href={`/hotel/${hotel.id}`}>
        Manage Hotel
      </Link>
    </div>
  );
};

export default HotelItem;
