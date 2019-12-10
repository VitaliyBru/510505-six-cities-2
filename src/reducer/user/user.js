const STATUS_OK = 200;

const initialState = {
  isAuth: false,
};

const ActionType = {
  SET_IS_AUTH: `SET_IS_AUTH`,
};

const ActionCreator = {
  setIsAuth: (status) => ({
    type: ActionType.SET_IS_AUTH,
    payload: status,
  }),
};

const Operation = {
  login: (email, password) => (dispatch, _getState, api) => {
    return api.post(`/login`, {email, password})
      .then((resp) => {
        if (resp.status === STATUS_OK) {
          dispatch(ActionCreator.setIsAuth(true));
        }
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_IS_AUTH: return Object.assign({}, state, {
      isAuth: action.payload,
    });
  }

  return state;
};

export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
};
