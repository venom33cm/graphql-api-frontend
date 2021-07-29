import React, { createContext, useContext, useReducer } from "react";

export const TokenContext = createContext();

export const TokenProvider = ({ inititialState, reducer, children }) => {
  return (
    <TokenContext.Provider value={useReducer(reducer, inititialState)}>
      {children}
    </TokenContext.Provider>
  );
};

export const GetTokenContext = () => {
  return useContext(TokenContext);
};
