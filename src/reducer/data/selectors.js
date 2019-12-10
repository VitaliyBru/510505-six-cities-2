import NameSpace from "../name-space";
import {createSelector} from "reselect";

const NAME_SPACE = NameSpace.DATA;

const getCity = (state) => state[NAME_SPACE].city;
const getAllCitiesOffers = (state) => state[NAME_SPACE].allCitiesOffers;

const findOffersForCity = createSelector(
    getAllCitiesOffers,
    getCity,
    (offers, city) => offers.filter((it) => it.city.name === city)
);

const getOffersForCity = (state) => findOffersForCity(state);

export {
  getCity,
  getAllCitiesOffers,
  getOffersForCity,
};
