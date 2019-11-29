import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";

it(`App correctly renders after relaunch`, () => {
  const div = global.document.createElement(`div`);
  div.setAttribute(`id`, `map`);
  global.document.body.appendChild(div);

  const tree = renderer
    .create(
        <App
          activeCity={` `}
          allCitiesOffers={[
            {
              "id": 0,
              "city": {
                "name": ` `,
                "location": {
                  "latitude": 0,
                  "longitude": 0,
                  "zoom": 0
                }
              },
              "is_premium": true,
              "preview_image": `preview_image`,
              "price": 0,
              "title": `title`,
              "type": `type`,
              "location": {
                "latitude": 0,
                "longitude": 0
              }
            }
          ]}
          cityOffers={[]}
          onCitySelection={() => {}}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
