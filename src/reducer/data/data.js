const initialState = {
  city: ``,
  allCitiesOffers: [],
};

const ActionType = {
  SET_CITY: `SET_CITY`,
  DOWNLOAD_OFFERS: `DOWNLOAD_OFFERS`,
};

const ActionCreator = {
  setCity: (city = ``) => ({
    type: ActionType.SET_CITY,
    payload: city
  }),

  downloadOffers: (allOffers = []) => ({
    type: ActionType.DOWNLOAD_OFFERS,
    payload: allOffers,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_CITY: return Object.assign({}, state, {
      city: action.payload,
    });

    case ActionType.DOWNLOAD_OFFERS: return Object.assign({}, state, {
      allCitiesOffers: action.payload,
    });
  }

  return state;
};

const Operation = {
  downloadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
    .then((resp) => {
      dispatch(ActionCreator.downloadOffers(resp.data));
    });
  },
};

export {
  ActionCreator,
  Operation,
  reducer,
};
