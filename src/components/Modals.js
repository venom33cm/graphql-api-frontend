import React from "react";
import "./modals.css";
function Modals(props) {
  return (
    <div className="modals">
      <h3>{props.title}</h3>
      <div className="event-info">{props.children}</div>
      <div className="btn-handler">
        {props.canCancel && (
          <button id="btn" onClick={props.onCancel}>
            cancel
          </button>
        )}
        {props.canConfirm && (
          <button id="btn" onClick={props.onConfirm}>
            {props.btnname}
          </button>
        )}
      </div>
    </div>
  );
}

export default Modals;
