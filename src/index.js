import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import App from "./components/app/app.jsx";
import {reducer} from "./reducer.js";
import {offers} from "./mock/offers.js";
import {ActionCreator} from "./reducer.js";

const init = () => {
  const store = createStore(
      reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
  );
  store.dispatch(ActionCreator.setActiveCity(offers[0].city.name));
  store.dispatch(ActionCreator.findOffersInCity(offers));

  ReactDOM.render(
      <Provider store={store}>
        <App allCitiesOffers={offers}/>
      </Provider>,
      document.getElementById(`root`)
  );
};

init();
