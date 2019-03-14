import { ACTION_SET_TOKEN } from "../constants/actionTypes";

export default (state = null, action) => {
  switch (action.type) {
    case ACTION_SET_TOKEN:
      return action.token;
    default:
      return state;
  }
};
