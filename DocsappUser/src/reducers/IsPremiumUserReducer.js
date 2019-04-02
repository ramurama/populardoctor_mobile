import { ACTION_SET_IS_PREMIUM_USER } from "../constants/actionTypes";

export default (state = false, action) => {
  switch (action.type) {
    case ACTION_SET_IS_PREMIUM_USER:
      return action.isPremiumUser;
    default:
      return state;
  }
};
