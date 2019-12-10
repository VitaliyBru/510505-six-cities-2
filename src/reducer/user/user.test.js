import {ActionCreator, Operation, reducer} from "./user";
import createAPI from "../../api";
import MockAdapter from "axios-mock-adapter";

it(`ActionCreator setIsAuth OK`, () => {
  expect(ActionCreator.setIsAuth(true))
    .toEqual({
      type: `SET_IS_AUTH`,
      payload: true,
    });
});

it(`Operation login OK`, () => {
  const dispatch = jest.fn();
  const api = createAPI();
  const mockApi = new MockAdapter(api);
  const login = Operation.login(`email`, `password`);

  mockApi
    .onPost(`/login`, {email: `email`, password: `password`})
    .reply(200);

  return login(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: `SET_IS_AUTH`,
        payload: true,
      });
    });
});

it(`reducer OK`, () => {
  expect(reducer(
      {
        isAuth: false
      },
      {
        type: `SET_IS_AUTH`,
        payload: true
      })
  ).toEqual({isAuth: true});
});
