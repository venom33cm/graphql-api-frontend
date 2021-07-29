import React from "react";
import "./eventitem.css";
import { GetTokenContext } from "../StateManagement/TokenProvider";

const EventItems = (props) => {
  const [{ userId }, dispatch] = GetTokenContext();
  return (
    <li className="items" key={props._id}>
      <div>
        <h4>{props.title}</h4>
        <p>Entry price: ₹{props.price}</p>
        <p>
          Event date and time: {new Date(props.date).toLocaleDateString()}{" "}
          {new Date(props.date).toLocaleTimeString()}
        </p>
      </div>
      <div>
        {userId === props.creatorId ? (
          <h4>You created this event</h4>
        ) : (
          <button id="buttn" onClick={props.details.bind(this, props.eventId)}>
            view details
          </button>
        )}
      </div>
    </li>
  );
};

export default EventItems;
