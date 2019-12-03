import React from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {PlaceList} from "../Place-list/place-list.jsx";
import {ActionCreator} from "../../reducer.js";
import withMap from "../../hocs/with-map/with-map";

const PlaceListWrapped = withMap(PlaceList);

const App = (props) => {
  const {activeCity, allCitiesOffers, cityOffers, onCitySelection} = props;

  return (
    <PlaceListWrapped
      activeCity={activeCity}
      allCitiesOffers={allCitiesOffers}
      cityOffers={cityOffers}
      onCitySelection={onCitySelection}
    />
  );
};

App.propTypes = {
  allCitiesOffers: PropTypes.arrayOf(PropTypes.object),
  activeCity: PropTypes.string.isRequired,
  cityOffers: PropTypes.arrayOf(PropTypes.object),
  onCitySelection: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeCity: state.activeCity,
  cityOffers: state.cityOffers,
});

const mapDispatchToProps = (dispatch) => ({
  onCitySelection: (newCity, allOffers) => {
    dispatch(ActionCreator.setActiveCity(newCity));
    dispatch(ActionCreator.findOffersInCity(allOffers));
  },
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
