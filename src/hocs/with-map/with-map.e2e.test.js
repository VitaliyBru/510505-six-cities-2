import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withMap from "./with-map";

Enzyme.configure({adapter: new Adapter()});
const div = global.document.createElement(`div`);
div.setAttribute(`id`, `map`);
global.document.body.appendChild(div);

it(``, () => {
  const mockElement = () => {
    return <div></div>;
  };
  const WithMap = withMap(mockElement);
  const mockElementWrapped = shallow(<WithMap/>);
  mockElementWrapped.props().onMouseEnterCard({location: {latitude: 0, longitude: 0}});
  expect(mockElementWrapped.state().activeCard).toEqual({location: {latitude: 0, longitude: 0}});

  const renderMap = mockElementWrapped.props().renderMap;
  const mapElement = shallow(renderMap([{city: {name: `cityOffers`, location: {latitude: 0, longitude: 0, zoom: 0}}, location: {latitude: 0, longitude: 0}}]));
  expect(mapElement.contains(<section className="cities__map map" id="map"/>)).toEqual(true);
});
