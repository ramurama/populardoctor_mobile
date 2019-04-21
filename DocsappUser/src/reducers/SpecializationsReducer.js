import { ACTION_SET_SPECIALIZATIONS } from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case ACTION_SET_SPECIALIZATIONS:
      return action.specializations;
    default:
      return state;
  }
};
