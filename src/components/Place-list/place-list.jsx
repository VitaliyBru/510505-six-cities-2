import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {PlaceCard} from "../place-card/place-card.jsx";
import {Map} from "../map/map.jsx";
import {CitiesTabs} from "../cities-tabs/cities-tabs.jsx";

const CITIES_AMOUNT = 6;

export class PlaceList extends PureComponent {
  static getCitiesList(allOffers) {
    const result = [];
    allOffers.some(({city: {name}}) => {
      if (result.indexOf(name) === -1) {
        result.push(name);
      }
      return result.length === CITIES_AMOUNT;
    });

    return result;
  }

  constructor(props) {
    super(props);

    this.state = {
      activeCard: {}
    };

    this.citiesList = PlaceList.getCitiesList(props.allCitiesOffers);
  }

  render() {
    const {activeCity, allCitiesOffers, cityOffers, onCitySelection, onMouseEnterCard, renderMap} = this.props;

    return (
      <div className="page page--gray page--main">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link header__logo-link--active">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </a>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <CitiesTabs
            activeCity={activeCity}
            allCitiesOffers={allCitiesOffers}
            citiesList={this.citiesList}
            onCitySelection={onCitySelection}
          />
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{cityOffers.length} places to stay in {activeCity}</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex="0">
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"/>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex="0">Popular</li>
                    <li className="places__option" tabIndex="0">Price: low to high</li>
                    <li className="places__option" tabIndex="0">Price: high to low</li>
                    <li className="places__option" tabIndex="0">Top rated first</li>
                  </ul>
                </form>
                <div className="cities__places-list places__list tabs__content">
                  {
                    cityOffers.map((it, i) => {
                      return (
                        <PlaceCard
                          key={`card${it.id}-${i}`}
                          offerItem={it}
                          onMouseEnterCard={onMouseEnterCard}
                        />
                      );
                    })
                  }
                </div>
              </section>
              <div className="cities__right-section">
                {renderMap(cityOffers)}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

PlaceList.propTypes = {
  allCitiesOffers: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeCity: PropTypes.string,
  cityOffers: PropTypes.arrayOf(PropTypes.object),
  onCitySelection: PropTypes.func,
  onMouseEnterCard: PropTypes.func.isRequired,
  renderMap: PropTypes.func.isRequired,
};
