import React from "react";
import ReactDOM from "react-dom";
import {App} from "./components/app/app.jsx";


const cardNameList = [
  {
    name: `Beautiful &amp; luxurious apartment at great location`,
    id: 0
  },
  {
    name: `Wood and stone place`,
    id: 1
  },
  {
    name: `Canal View Prinsengracht`,
    id: 2
  },
  {
    name: `Nice, cozy, warm big bed apartment`,
    id: 3
  },
];

const init = () => {
  ReactDOM.render(
      <App cardNamesList={cardNameList}/>,
      document.getElementById(`root`)
  );
};

init();
