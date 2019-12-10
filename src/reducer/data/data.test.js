import {ActionCreator, reducer, Operation} from "./data";
import createAPI from "../../api";
import MockAdapter from "axios-mock-adapter";

describe(`ActionCreator OK`, () => {
  it(`setCity OK`, () => {
    expect(ActionCreator.setCity(`new city`))
      .toEqual({
        type: `SET_CITY`,
        payload: `new city`
      });
  });
  it(`downloadOffers OK`, () => {
    expect(ActionCreator.downloadOffers([{test: `test`}]))
      .toEqual({
        type: `DOWNLOAD_OFFERS`,
        payload: [{test: `test`}],
      });
  });
});

describe(`reducer OK`, () => {
  it(`SET_CITY returns correct`, () => {
    expect(reducer(
        {
          city: `city`,
          allCitiesOffers: [],
        },
        {
          type: `SET_CITY`,
          payload: `new city`
        })
    ).toEqual({
      city: `new city`,
      allCitiesOffers: [],
    });
  });
  it(`DOWNLOAD_OFFERS returns correct`, () => {
    expect(reducer(
        {
          city: `city`,
          allCitiesOffers: [],
        },
        {
          type: `DOWNLOAD_OFFERS`,
          payload: [
            {
              offer: `offer-1`,
            },
            {
              offer: `offer-2`,
            },
          ]
        })).toEqual(
        {
          city: `city`,
          allCitiesOffers: [
            {
              offer: `offer-1`,
            },
            {
              offer: `offer-2`,
            },
          ],
        });
  });
});

it(`Operation downloadOffers OK`, () => {
  const dispatch = jest.fn();
  const api = createAPI();
  const mockApi = new MockAdapter(api);
  const downLoadOffers = Operation.downloadOffers();

  mockApi
    .onGet(`/hotels`)
    .reply(200, [{mock: `mock`}]);

  return downLoadOffers(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: `DOWNLOAD_OFFERS`,
        payload: [{mock: `mock`}],
      });
    });
});

