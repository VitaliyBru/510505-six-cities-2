import React, {Component} from "react";
import PropTypes from "prop-types";

export class PlaceCard extends Component {
  constructor(props) {
    super(props);

    this._handlerMouseEnter = this._handlerMouseEnter.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.offerItem !== this.props.offerItem;
  }

  render() {
    const {
      offerItem: {
        "is_premium": isPremium,
        "preview_image": srcImg,
        price,
        title,
        type
      }
    } = this.props;

    return (
      <article className="cities__place-card place-card" onMouseEnter={this._handlerMouseEnter}>
        {
          isPremium && <div className="place-card__mark">
            <span>Premium</span>
          </div>
        }
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img className="place-card__image" src={srcImg} width="260" height="200"
              alt="Place image"/>
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className="place-card__bookmark-button button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"/>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: `93%`}}/>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="#">{title}</a>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    );
  }

  _handlerMouseEnter() {
    this.props.onMouseEnterCard(this.props.offerItem);
  }
}

PlaceCard.propTypes = {
  offerItem: PropTypes.shape({
    "is_premium": PropTypes.bool.isRequired,
    "preview_image": PropTypes.string.isRequired,
    "price": PropTypes.number.isRequired,
    "title": PropTypes.string.isRequired,
    "type": PropTypes.string.isRequired
  }).isRequired,
  onMouseEnterCard: PropTypes.func.isRequired
};
