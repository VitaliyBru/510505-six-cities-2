import React from "react";
import renderer from "react-test-renderer";
import {MainScreen} from "./main-screen.jsx";

it(`PlaceList correctly renders after relaunch`, () => {
  const div = global.document.createElement(`div`);
  div.setAttribute(`id`, `map`);
  global.document.body.appendChild(div);

  const tree = renderer
    .create(
        <MainScreen
          allCitiesOffers={[
            {
              "id": 0,
              "city": {
                "name": ` `,
                "location": {
                  "latitude": 0,
                  "longitude": 0,
                  "zoom": 0,
                },
              },
              "is_premium": true,
              "preview_image": `preview_image`,
              "price": 0,
              "title": `title`,
              "type": `type`,
              "location": {
                "latitude": 0,
                "longitude": 0,
              },
            }
          ]}
          activeCity={` `}
          cityOffers={[]}
          findOffersInCity={() => {}}
          onCitySelection={() => {}}
          setActiveCity={() => {}}
          onMouseEnterCard={() => {}}
          renderMap={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
