import { ACTION_SET_FAVORITES } from "../constants/actionTypes";

export default (state = null, action) => {
  switch (action.type) {
    case ACTION_SET_FAVORITES:
      return action.favorites;
    default:
      return state;
  }
};
