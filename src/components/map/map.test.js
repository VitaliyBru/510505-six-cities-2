import React from "react";
import renderer from "react-test-renderer";
import {Map} from "./map.jsx";

it(`PlaceList correctly renders after relaunch`, () => {
  const div = global.document.createElement(`div`);
  div.setAttribute(`id`, `map`);
  global.document.body.appendChild(div);

  const tree = renderer
    .create(
        <Map
          cityOffers={[
            {
              "city": {
                "location": {
                  "latitude": 0,
                  "longitude": 0,
                  "zoom": 0
                },
              },
              "location": {
                "latitude": 0,
                "longitude": 0
              },
            }
          ]}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
