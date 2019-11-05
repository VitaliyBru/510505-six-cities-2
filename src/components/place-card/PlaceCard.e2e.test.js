import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {PlaceCard} from "./place-card.jsx";

Enzyme.configure({adapter: new Adapter()});

it(`PlaceCard - click called callback`, () => {
  const mockClickHandler = jest.fn();

  const placeCard = shallow(
      <PlaceCard
        cardName={` `}
        onClick={mockClickHandler}
      />
  );

  placeCard.find(`.place-card__name a`).simulate(`click`);
  expect(mockClickHandler).toHaveBeenCalledTimes(1);
});
