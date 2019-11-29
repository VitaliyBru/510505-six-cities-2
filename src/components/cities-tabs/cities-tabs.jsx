import React, {PureComponent} from "react";
import PropTypes from "prop-types";

export class CitiesTabs extends PureComponent {
  constructor(props) {
    super(props);

    this._handlerTabClick = this._handlerTabClick.bind(this);
  }

  render() {
    const {activeCity, citiesList} = this.props;

    return (
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {
              citiesList.map((cityName) => {
                const elemMod = cityName === activeCity ? ` tabs__item--active` : ``;
                return (
                  <li className="locations__item" key={cityName}>
                    <a className={`locations__item-link tabs__item${elemMod}`} href="#" onClick={this._handlerTabClick}>
                      <span>{cityName}</span>
                    </a>
                  </li>
                );
              })
            }
          </ul>
        </section>
      </div>
    );
  }

  _handlerTabClick(evt) {
    const {onCitySelection, allCitiesOffers} = this.props;

    evt.preventDefault();
    onCitySelection(evt.currentTarget.firstChild.innerText, allCitiesOffers);
  }
}

CitiesTabs.propTypes = {
  activeCity: PropTypes.string.isRequired,
  citiesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  allCitiesOffers: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCitySelection: PropTypes.func.isRequired,
};
