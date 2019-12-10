import React from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {MainScreen} from "../main-screen/main-screen.jsx";
import {getAllCitiesOffers, getOffersForCity, getCity} from "../../reducer/data/selectors";
import {ActionCreator, Operation} from "../../reducer/data/data";
import withMap from "../../hocs/with-map/with-map";

const MainScreenWrapped = withMap(MainScreen);

const App = (props) => {
  const {activeCity, allCitiesOffers, cityOffers, onCitySelection} = props;

  return (
    <MainScreenWrapped
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
  activeCity: getCity(state),
  allCitiesOffers: getAllCitiesOffers(state),
  cityOffers: getOffersForCity(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCitySelection: (newCity) => {
    dispatch(ActionCreator.setCity(newCity));
    dispatch(Operation.downloadOffers());
  },
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
