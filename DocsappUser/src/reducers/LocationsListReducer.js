import { ACTION_SET_LOCATION_LIST } from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case ACTION_SET_LOCATION_LIST:
      return action.locationsList;
    default:
      return state;
  }
};
