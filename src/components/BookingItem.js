import React from "react";
import "./bookitem.css";
function BookingItem(props) {
  return (
    <li className="bookitems">
      <div>
        <h3>{props.booking.event.title}</h3>
        <p>
          bookings done at:
          {new Date(props.booking.createdAt).toLocaleDateString()}{" "}
          {new Date(props.booking.createdAt).toLocaleTimeString()}
        </p>
      </div>
      <div>
        <button
          id="buttn"
          onClick={props.handleCancel.bind(this, props.booking._id)}
        >
          Cancel Booking
        </button>
      </div>
    </li>
  );
}

export default BookingItem;
