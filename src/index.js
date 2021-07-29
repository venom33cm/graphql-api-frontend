import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { TokenProvider } from "./StateManagement/TokenProvider";
import { BrowserRouter } from "react-router-dom";
import reducer, { inititialState } from "./StateManagement/Reducer";

ReactDOM.render(
  <React.StrictMode>
    <TokenProvider inititialState={inititialState} reducer={reducer}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TokenProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
