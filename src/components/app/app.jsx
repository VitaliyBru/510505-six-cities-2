import React from 'react';
import PropTypes from "prop-types";
import {PlaceList} from "../Place-list/place-list.jsx";

export const App = (props) => {
  const {offersList} = props;

  return (
    <PlaceList
      offersList={offersList}
    />
  );
};

App.propTypes = {
  offersList: PropTypes.arrayOf(PropTypes.object).isRequired
};
