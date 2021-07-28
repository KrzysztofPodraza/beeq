import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import AddressBookContextProvider from "./store/AddressBookContext";

ReactDOM.render(
  <AddressBookContextProvider>
    <App />
  </AddressBookContextProvider>,
  document.getElementById("root")
);
