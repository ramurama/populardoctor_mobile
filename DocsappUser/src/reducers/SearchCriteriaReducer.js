import { ACTION_SET_SEARCH_CRITERIA } from "../constants/actionTypes";

export default (state = null, action) => {
  switch (action.type) {
    case ACTION_SET_SEARCH_CRITERIA:
      return action.searchCriteria;
    default:
      return state;
  }
};
