import {
  ActionCreator,
  getCityOffers,
  reducer,
} from "./reducer.js";

describe(`ActionCreator OK`, () => {
  it(`setActiveCity OK`, () => {
    expect(ActionCreator.setActiveCity(`new city`))
      .toEqual({
        type: `SET_CITY`,
        payload: `new city`
      });
  });
  it(`findOffersInCity OK`, () => {
    expect(ActionCreator.findOffersInCity([{id: 0}]))
      .toEqual({
        type: `FIND_OFFERS_IN_CITY`,
        payload: [{id: 0}],
      });
  });
});

describe(`reducer OK`, () => {
  it(`SET_CITY returns correct`, () => {
    expect(reducer(
        {
          activeCity: `city`,
          cityOffers: [],
        },
        {
          type: `SET_CITY`,
          payload: `new city`
        })
    ).toEqual({
      activeCity: `new city`,
      cityOffers: [],
    });
  });
  it(`FIND_OFFERS_IN_CITY returns correct`, () => {
    expect(reducer(
        {
          activeCity: `city-target`,
          cityOffers: [`list`],
        },
        {
          type: `FIND_OFFERS_IN_CITY`,
          payload: [
            {
              city: {name: `city-1`},
            },
            {
              city: {name: `city-target`},
            },
            {
              city: {name: `city-target`},
            },
          ]
        })).toEqual(
        {
          activeCity: `city-target`,
          cityOffers: [
            {
              city: {name: `city-target`},
            },
            {
              city: {name: `city-target`},
            },
          ],
        });
  });
});

it(`getCityOffers OK`, () => {
  const allCitiesOffers = [
    {
      city: {name: `city-1`},
    },
    {
      city: {name: `city-target`},
    },
    {
      city: {name: `city-target`},
    },
  ];

  expect(getCityOffers(allCitiesOffers, `city-target`))
    .toEqual([
      {
        city: {name: `city-target`},
      },
      {
        city: {name: `city-target`},
      },
    ]);
});

