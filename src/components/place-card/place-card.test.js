import React from "react";
import renderer from "react-test-renderer";
import {PlaceCard} from "./place-card.jsx";

it(`PlaceCard correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <PlaceCard
          offerItem={{
            "is_premium": true,
            "preview_image": ` `,
            "price": 0,
            "title": ` `,
            "type": ` `,
          }}
          onMouseEnterCard={jest.fn()}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
