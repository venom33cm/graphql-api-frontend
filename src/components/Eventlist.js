import React from "react";
import EventItems from "./EventItems";

const Eventlist = (props) => {
  const listevents = props.events.map((event) => {
    return (
      <EventItems
        key={event._id}
        title={event.title}
        creatorId={event.creator._id}
        price={event.price}
        eventId={event._id}
        date={event.date}
        details={props.showdetails}
      />
    );
  });
  return <ul className="listitems">{listevents}</ul>;
};

export default Eventlist;
