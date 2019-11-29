import React from "react";
import renderer from "react-test-renderer";
import {CitiesTabs} from "./cities-tabs.jsx";

it(`CitiesTabs renderer OK`, () => {
  const tree = renderer.create(
      <CitiesTabs
        activeCity={` `}
        citiesList={[]}
        allCitiesOffers={[]}
        onCitySelection={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
