import React from "react";
import "./spinner.css";

function Spinnner() {
  return (
    <div className="spinner">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Spinnner;
