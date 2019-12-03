import React, {PureComponent} from "react";
import {Map} from "../../components/map/map.jsx";

const withMap = (ReactElement) => {
  class WithMap extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeCard: {}
      };

      this._enterMouseHandler = this._enterMouseHandler.bind(this);
    }

    render() {
      const {activeCard: {location}} = this.state;

      return (<ReactElement
        {...this.props}
        renderMap={(cityOffers) => {
          return (<Map
            cityOffers={cityOffers}
            activeLocation={location}
          />);
        }}
        onMouseEnterCard={this._enterMouseHandler}
      />);
    }

    componentDidUpdate(prevProps, prevState) {
      if (this.state.activeCard.id && this.state.activeCard.id === prevState.activeCard.id) {
        this.setState({activeCard: {}});
      }
    }

    _enterMouseHandler(currentCard) {
      this.setState({activeCard: currentCard});
    }
  }

  WithMap.propTypes = {};

  return WithMap;
};

export default withMap;
