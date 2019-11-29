import React, {PureComponent} from "react";
import leaflet from "leaflet";
import PropTypes from "prop-types";

const IconAsset = {
  URL: `img/pin.svg`,
  SIZE: [30, 30],
  ANCHOR: [-15, -30],
};

export class Map extends PureComponent {
  constructor(props) {
    super(props);
    this.map = null;
    this.icon = leaflet.icon({
      iconUrl: IconAsset.URL,
      iconSize: IconAsset.SIZE,
      iconAnchor: IconAsset.ANCHOR,
    });
  }

  render() {
    return <section className="cities__map map" id="map"/>;
  }

  componentDidMount() {
    const {cityOffers} = this.props;
    let cityLatitude = 0;
    let cityLongitude = 0;
    let cityZoom = 12;
    if (cityOffers.length) {
      cityLatitude = cityOffers[0].city.location.latitude;
      cityLongitude = cityOffers[0].city.location.longitude;
      cityZoom = cityOffers[0].city.location.zoom;
    }
    const cityLocation = [cityLatitude, cityLongitude];
    this.map = leaflet.map(`map`, {
      center: cityLocation,
      zoom: cityZoom,
      zoomControl: false,
      marker: true
    });
    this.map.setView(cityLocation, cityZoom);
    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this.map);

    cityOffers.forEach((it) => {
      leaflet
        .marker([it.location.latitude, it.location.longitude], {icon: this.icon})
        .addTo(this.map);
    });
  }

  componentDidUpdate(prevProps) {
    const {cityOffers} = this.props;

    if (prevProps.cityOffers !== cityOffers) {
      this.map.eachLayer((layer) => {
        if (layer.getLatLng) {
          this.map.removeLayer(layer);
        }
      });

      this.map.setView(
          [
            cityOffers[0].city.location.latitude,
            cityOffers[0].city.location.longitude
          ],
          cityOffers[0].city.location.zoom
      );

      cityOffers.forEach((it) => {
        leaflet
          .marker([it.location.latitude, it.location.longitude], {icon: this.icon})
          .addTo(this.map);
      });
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }
}

Map.propTypes = {
  "cityOffers": PropTypes.arrayOf(PropTypes.shape({
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
