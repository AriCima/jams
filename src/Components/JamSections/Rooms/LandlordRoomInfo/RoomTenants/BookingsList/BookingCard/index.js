import React from "react";

// CSS
import "./index.css";

const BookingCard = (props) => {

  const { bI  } = props;

  return (
    <tr>
      <td id="number-column">{bI.roomNr}</td>
      <td>{bI.firstName} {bI.lastName}</td>
      <td>{bI.checkIn}</td>
      <td>{bI.checkOut}</td>
      <td>{bI.rent}</td>
      <td>{bI.deposit}</td>
  </tr>


  )
  
}

export default BookingCard;
