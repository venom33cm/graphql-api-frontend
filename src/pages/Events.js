import React, { useState, useEffect } from "react";
import Backdrop from "../components/Backdrop";
import Eventlist from "../components/Eventlist";
import Modals from "../components/Modals";
import Spinnner from "../components/Spinnner";
import { GetTokenContext } from "../StateManagement/TokenProvider";

function Events() {
  const [{ token, userId }, dispatch] = GetTokenContext();
  const [callmodal, setcallmodal] = useState(false);
  const [events, setevents] = useState([]);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [date, setdate] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [selectevent, setselectevent] = useState(null);

  const reqevents = {
    query: `
      query{
        getEvent{
          _id
          title
          description
          price
          date
          creator{
            _id
          }
        }
      }`,
  };

  const eventcall = () => {
    setisLoading(true);
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      body: JSON.stringify(reqevents),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("error occured");
        }
        return res.json();
      })
      .then((resdata) => {
        console.log(resdata);
        setevents(resdata.data.getEvent);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };
  // const listevents = events.map((event) => {
  //   return (
  //     <li className="items" key={event._id}>
  //       {event.title}
  //     </li>
  //   );
  // });
  useEffect(() => {
    eventcall();
  }, []);

  const handleClick = () => {
    setcallmodal(true);
  };

  const onCancel = () => {
    setcallmodal(false);
    setselectevent(null);
  };
  const onConfirm = () => {
    setcallmodal(false);
    if (
      title.trim(" ").length === 0 ||
      description.trim(" ").length === 0 ||
      +price < 0 ||
      date.trim(" ").length === 0
    ) {
      alert("fill all details");
      return;
    }
    // const events = {
    //   title: title,
    //   description: description,
    //   price: +price,
    //   date: date,
    // };
    // console.log(events);

    const reqbody = {
      query: `
        mutation{
           createEvent(eventInput:{title:"${title}",description:"${description}",price:${+price},date:"${date}"}){
             _id
             title
             description
             price
             date
             creator{
               _id
               email
             }
           }
        }`,
    };

    setisLoading(true);
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      body: JSON.stringify(reqbody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("unAuthenticated /some error ocurred");
        }
        return res.json();
      })
      .then((resdata) => {
        console.log(resdata);
        let updatedevents = [...events];
        updatedevents.push({
          _id: resdata.data.createEvent._id,
          title: resdata.data.createEvent.title,
          description: resdata.data.createEvent.description,
          price: resdata.data.createEvent.price,
          date: resdata.data.createEvent.date,
          creator: {
            _id: userId,
          },
        });
        setevents(updatedevents);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
    settitle("");
    setdescription("");
    setprice("");
    setdate("");
  };

  const eventdetails = (eventid) => {
    // console.log(eventid);
    const selectevent = events.find((event) => event._id === eventid);
    setselectevent(selectevent);
  };

  const bookEvent = () => {
    // setselectevent(null);
    if (!token) {
      setselectevent(null);
      return;
    }

    const bookbody = {
      query: `
        mutation{
          BookEvent(eventId:"${selectevent._id}"){
            _id
            createdAt
            updatedAt
          }
        }`,
    };

    fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(bookbody),
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("unAuthenticated/some error occured");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        setselectevent(null);
      })
      .catch((err) => {
        console.log(err);
        setselectevent(null);
      });
  };

  return (
    <div className="events">
      {(callmodal || selectevent) && <Backdrop />}

      {callmodal && (
        <Modals
          title="Add your Event"
          onCancel={onCancel}
          onConfirm={onConfirm}
          canCancel
          canConfirm
          btnname={token ? "create" : "confirm"}
        >
          <form>
            <label htmlFor="title">title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
            <label htmlFor="price">price</label>
            <input
              type="Number"
              value={price}
              onChange={(e) => setprice(e.target.value)}
            />
            <label htmlFor="date">date</label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setdate(e.target.value)}
            />
            <label htmlFor="description">description</label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
          </form>
        </Modals>
      )}
      {token && (
        <div className="btn-container">
          <h3>Go on! share your Events!</h3>
          <button id="buttn" onClick={handleClick}>
            + create your event
          </button>
        </div>
      )}

      {isLoading && <Spinnner />}
      {selectevent && (
        <Modals
          title="Event Details"
          onCancel={onCancel}
          onConfirm={bookEvent}
          canCancel
          canConfirm
          btnname={token ? "book" : "confirm"}
        >
          <h3 className="title">{selectevent.title}</h3>
          <p className="pricedate"> Entry price: ₹{selectevent.price}</p>
          <p className="pricedate">
            Scheduled At: {new Date(selectevent.date).toLocaleDateString()}
          </p>
          <p className="pricedate">
            Time: {new Date(selectevent.date).toLocaleTimeString()}
          </p>
          <h4 className="title">what is it about?</h4>
          <p className="description">{selectevent.description}</p>
        </Modals>
      )}

      <Eventlist events={events} showdetails={eventdetails} />
    </div>
  );
}

export default Events;
