import React from "react";
import renderer from "react-test-renderer";
import {PlaceCard} from "./place-card.jsx";

it(`PlaceCard correctly renders after relaunch`, () => {
  const tree = renderer.create(
      <PlaceCard
        cardName={` `}
        onClick={() => {}}
      />
  ).toJSON;

  expect(tree).toMatchSnapshot();
});
