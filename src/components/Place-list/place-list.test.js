import React from "react";
import renderer from "react-test-renderer";
import {PlaceList} from "./place-list.jsx";

it(`PlaceList correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <PlaceList
          offersList={[
            {
              "id": 0,
              "is_premium": true,
              "preview_image": `preview_image`,
              "price": 0,
              "title": `title`,
              "type": `type`,
            }
          ]}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
