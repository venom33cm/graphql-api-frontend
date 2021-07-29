import React, { useEffect, useState } from "react";
import BookingItem from "../components/BookingItem";
import { GetTokenContext } from "../StateManagement/TokenProvider";
import Spinnner from "../components/Spinnner";
function Bookings() {
  const [{ token, userId }, dispatch] = GetTokenContext();
  const [isLoading, setisLoading] = useState(false);

  const [bookings, setBookings] = useState([]);
  const reqbookings = {
    query: `
      query{
        getBookings{
          _id
          createdAt
          updatedAt
          event{
            _id
            title
            price
          }
        }
      }`,
  };

  const bookingcall = () => {
    if (!token) {
      return;
    }
    setisLoading(true);
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      body: JSON.stringify(reqbookings),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("error occured");
        }
        return res.json();
      })
      .then((resdata) => {
        // console.log(resdata);
        const getbookings = resdata.data.getBookings;
        setBookings(getbookings);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };

  const handleCancel = (bookingId) => {
    if (!token) {
      return;
    }
    const reqcancels = {
      query: `
        mutation{
          cancelBooking(bookedId:"${bookingId}"){
            _id
            title
            date
          }
        }`,
    };

    setisLoading(true);
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      body: JSON.stringify(reqcancels),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("error occured");
        }
        return res.json();
      })
      .then((resdata) => {
        // console.log(resdata);
        // const getbookings = resdata.data.getBookings;
        // setBookings(getbookings);
        const updatedBooking = bookings.filter((booking) => {
          return booking._id !== bookingId;
        });
        setBookings(updatedBooking);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };

  useEffect(() => {
    bookingcall();
    console.log(bookings);
  }, []);

  return (
    <div className="booking">
      {isLoading && <Spinnner />}
      <ul className="book-container">
        {bookings.map((booking) => (
          <BookingItem
            key={booking._id}
            booking={booking}
            handleCancel={handleCancel}
          />
        ))}
      </ul>
    </div>
  );
}

export default Bookings;
