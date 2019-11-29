import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {CitiesTabs} from "./cities-tabs.jsx";

Enzyme.configure({adapter: new Adapter()});

it(`CitiesTabs correct`, () => {
  const onCitySelection = jest.fn();
  const preventDefault = jest.fn();
  const citiesList = [`city-1`];

  const citiesTabs = shallow(
      <CitiesTabs
        activeCity={` `}
        citiesList={citiesList}
        allCitiesOffers={[]}
        onCitySelection={onCitySelection}
      />
  );

  citiesTabs.find(`.tabs__item`).simulate(`click`, {preventDefault, currentTarget: {firstChild: {innerText: `city-1`}}});

  expect(preventDefault).toHaveBeenCalledTimes(1);
  expect(onCitySelection).toHaveBeenCalledTimes(1);
  expect(onCitySelection).toHaveBeenCalledWith(`city-1`, []);
});
