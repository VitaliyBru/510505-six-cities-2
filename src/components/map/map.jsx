import React, {PureComponent} from "react";
import leaflet from "leaflet";
import PropTypes from "prop-types";

export class Map extends PureComponent {
  constructor(props) {
    super(props);
    this.ICON_URL = `img/pin.svg`;
    this.ICON_SIZE = [30, 30];
  }

  render() {
    return <section className="cities__map map" id="map"/>;
  }

  componentDidMount() {
    const {offersList, offersList: [{city}]} = this.props;
    const cityLocation = [city.location.latitude, city.location.longitude];
    const icon = leaflet.icon({
      iconUrl: this.ICON_URL,
      iconSize: this.ICON_SIZE
    });
    const map = leaflet.map(`map`, {
      center: cityLocation,
      zoom: city.location.zoom,
      zoomControl: false,
      marker: true
    });
    map.setView(cityLocation, city.location.zoom);
    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    offersList.forEach((it) => {
      leaflet
        .marker([it.location.latitude, it.location.longitude], {icon})
        .addTo(map);
    });
  }

}

Map.propTypes = {
  "offersList": PropTypes.arrayOf(PropTypes.shape({
    "city": PropTypes.shape({
      "location": PropTypes.shape({
        "latitude": PropTypes.number.isRequired,
        "longitude": PropTypes.number.isRequired,
        "zoom": PropTypes.number.isRequired
      }).isRequired
    }).isRequired,
    "location": PropTypes.shape({
      "latitude": PropTypes.number.isRequired,
      "longitude": PropTypes.number.isRequired
    }).isRequired
  })).isRequired
};
