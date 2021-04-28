import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import reducer, { initialState } from "./reducer";
import { StateProvider } from "./StateProvider";

ReactDOM.render(
  <React.StrictMode>
    {/* every componenets can get access to the datlaayer*/}

    <StateProvider initialState={initialState} reducer={reducer}>
      {/* intial meaning is occuring at the beginning*/}
      {/* intitialState is how the data looks in the begining */}
      {/* reducer is how we manipulate the datalayer */}
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
