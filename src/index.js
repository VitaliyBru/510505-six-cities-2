import React from "react";
import ReactDOM from "react-dom";
import {App} from "./components/app/app.jsx";
import {offers} from "./mock/offers.js";

const init = () => {
  ReactDOM.render(
      <App offersList={offers}/>,
      document.getElementById(`root`)
  );
};

init();
