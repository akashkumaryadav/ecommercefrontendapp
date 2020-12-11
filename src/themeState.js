import React, { useReducer } from "react";
import themeContext from "./themeContext";
import themeReducer from "./themeReducer";

const ThemeState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(themeReducer, initialState);

  const setTheme = (type) => {
    dispatch({ type: type });
  };

  return (
    <themeContext.Provider
      value={{
        alerts: state,
        setTheme: setTheme,
      }}
    >
      {props.children}
    </themeContext.Provider>
  );
};

export default ThemeState;
