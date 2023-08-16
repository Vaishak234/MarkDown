import React, { createContext, useContext, useReducer, useState } from "react";

// Prepares the dataLayer
export const StateContext = createContext();
export const FollowContext = createContext();
// Wrap our app and provide the Data layer
export const StateProvider = ({ reducer, initialState, children}) => {
 
  const [state, dispatch] = useReducer(reducer, initialState)
  
    return (
      <StateContext.Provider value={{ state, dispatch }}>
           { children }
      </StateContext.Provider>
  )
}
// Pull information from the data layer
export const useStateValue = () => useContext(StateContext);