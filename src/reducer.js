const getCityOffers = (allOffers, cityName) => {
  const result = [];
  allOffers.forEach((it) => {
    if (it.city.name === cityName) {
      result.push(it);
    }
  });
  return result;
};

const initialState = {
  activeCity: ``,
  cityOffers: [],
};

const ActionCreator = {
  setActiveCity: (city = ``) => ({
    type: `SET_CITY`,
    payload: city
  }),

  findOffersInCity: (allOffers = []) => ({
    type: `FIND_OFFERS_IN_CITY`,
    payload: allOffers,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `SET_CITY`: return Object.assign({}, state, {
      activeCity: action.payload,
    });

    case `FIND_OFFERS_IN_CITY`: return Object.assign({}, state, {
      cityOffers: getCityOffers(action.payload, state.activeCity),
    });
  }

  return state;
};

export {
  ActionCreator,
  getCityOffers,
  reducer,
};
