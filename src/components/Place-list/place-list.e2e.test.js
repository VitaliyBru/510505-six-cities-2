import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {PlaceList} from "./place-list.jsx";

Enzyme.configure({adapter: new Adapter()});

it(`PlaceList OK`, () => {
  const mockMouseEnter = jest.fn();
  const mockRenderMap = jest.fn();

  const placeList = mount(
      <PlaceList
        allCitiesOffers={[
          {
            "id": 0,
            "city": {
              "name": `cityName`,
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
        cityOffers={[
          {
            "id": 0,
            "city": {
              "name": `cityName`,
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
        activeCity={`cityName`}
        onCitySelection={() => {}}
        onMouseEnterCard={mockMouseEnter}
        renderMap={mockRenderMap}
      />
  );

  expect(mockRenderMap).toHaveBeenCalledTimes(1);
  placeList.find(`.place-card`).simulate(`mouseEnter`);
  expect(mockMouseEnter).toHaveBeenCalledTimes(1);
});
