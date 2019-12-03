import React, {PureComponent} from "react";
import leaflet from "leaflet";
import PropTypes from "prop-types";

const FIRST_IN_ARRAY = 0;
const IconAsset = {
  URL_PIN: `img/pin.svg`,
  URL_ACTIVE_PIN: `img/pin-active.svg`,
  SIZE: [30, 30],
  ANCHOR: [-15, -30],
};

export class Map extends PureComponent {
  constructor(props) {
    super(props);
    this.map = null;
    this.layerWithActivePin = null;
    this.icon = leaflet.icon({
      iconUrl: IconAsset.URL_PIN,
      iconSize: IconAsset.SIZE,
      iconAnchor: IconAsset.ANCHOR,
    });
    this.iconActive = leaflet.icon({
      iconUrl: IconAsset.URL_ACTIVE_PIN,
      iconSize: IconAsset.SIZE,
      iconAnchor: IconAsset.ANCHOR,
    });
  }

  render() {
    return <section className="cities__map map" id="map"/>;
  }

  componentDidMount() {
    const {cityOffers} = this.props;
    const cityLatitude = cityOffers[FIRST_IN_ARRAY].city.location.latitude ? cityOffers[FIRST_IN_ARRAY].city.location.latitude : 0;
    const cityLongitude = cityOffers[FIRST_IN_ARRAY].city.location.longitude ? cityOffers[FIRST_IN_ARRAY].city.location.longitude : 0;
    const cityZoom = cityOffers[FIRST_IN_ARRAY].city.location.zoom ? cityOffers[FIRST_IN_ARRAY].city.location.zoom : 12;

    // Инициализирует карту
    this.map = leaflet.map(`map`, {
      center: [cityLatitude, cityLongitude],
      zoom: cityZoom,
      zoomControl: false,
      marker: true
    });
    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this.map);

    // Добаляет на карту метки из массива объявлений и позиционирует карту
    this._setPinToTheMap(cityOffers);
  }

  componentDidUpdate(prevProps) {
    const {cityOffers, activeLocation} = this.props;

    // удаляет с карты все метки если массив объявлений изменился
    if (prevProps.cityOffers !== cityOffers) {
      this.map.eachLayer((layer) => {
        if (layer.getLatLng) {
          this.map.removeLayer(layer);
        }
      });

      // Добаляет на карту метки из массива объявлений и позиционирует карту
      this._setPinToTheMap(cityOffers);
    }

    // Заменяет иконку пина для предложения
    if (activeLocation && activeLocation !== prevProps.activeLocation) {
      const latLng = leaflet.latLng(activeLocation.latitude, activeLocation.longitude);
      if (this.layerWithActivePin) {
        this.layerWithActivePin.setIcon(this.icon);
      }

      this.map.eachLayer((layer) => {
        if (layer.getLatLng && latLng.equals(layer.getLatLng())) {
          layer.setIcon(this.iconActive);
          this.layerWithActivePin = layer;
        }
      });
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  _setPinToTheMap(offers) {
    const [{city: {location}}] = offers;
    this.map.setView(
        [
          location.latitude ? location.latitude : 0,
          location.longitude ? location.longitude : 0
        ],
        location.zoom ? location.zoom : 12
    );

    offers.forEach((it) => {
      leaflet
        .marker([it.location.latitude, it.location.longitude], {icon: this.icon})
        .addTo(this.map);
    });
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
  })).isRequired,
  "activeLocation": PropTypes.shape({
    "latitude": PropTypes.number.isRequired,
    "longitude": PropTypes.number.isRequired,
  })
};
