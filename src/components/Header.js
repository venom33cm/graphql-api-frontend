import React from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import { GetTokenContext } from "../StateManagement/TokenProvider";

function Header() {
  const [{ token, userId }, dispatch] = GetTokenContext();
  const handlelogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <div className="header">
      <div className="logo">
        <h3>Eventzz</h3>
      </div>
      <nav className="navelements">
        <ul>
          <NavLink to="/events">
            <li>Events</li>
          </NavLink>
          {token && (
            <div className="book-btn">
              <NavLink to="/bookings">
                <li>Bookings</li>
              </NavLink>
              <li>
                <button id="butn" onClick={handlelogout}>
                  Logout
                </button>
              </li>
            </div>
          )}
          {!token && (
            <NavLink to="/auth">
              <li>Authenticate</li>
            </NavLink>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
