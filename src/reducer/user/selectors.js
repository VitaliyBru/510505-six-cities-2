import NameSpace from "../name-space";

const NAME_SPACE = NameSpace.USER;

export const getIsAuth = (state) => state[NAME_SPACE].isAuth;
