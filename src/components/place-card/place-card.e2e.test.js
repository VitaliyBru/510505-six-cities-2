import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {PlaceCard} from "./place-card.jsx";

Enzyme.configure({adapter: new Adapter()});

it(`PlaceCard - click called callback`, () => {
  const mockEnterHandler = jest.fn();
  const mockOfferItem = {
    "is_premium": true,
    "preview_image": `preview_image`,
    "price": 0,
    "title": `title`,
    "type": `type`,
  };

  const placeCard = shallow(
      <PlaceCard
        offerItem={mockOfferItem}
        onMouseEnterCard={mockEnterHandler}
      />
  );

  placeCard.find(`.place-card`).simulate(`mouseEnter`);
  expect(mockEnterHandler).toHaveBeenCalledTimes(1);
  expect(mockEnterHandler).toHaveBeenCalledWith(mockOfferItem);
});
