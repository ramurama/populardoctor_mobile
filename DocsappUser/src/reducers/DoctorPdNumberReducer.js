import { ACTION_SET_DOCTOR_PD_NUMBER } from '../constants/actionTypes';

export default (state = '', action) => {
  switch (action.type) {
    case ACTION_SET_DOCTOR_PD_NUMBER:
      return action.doctorPdNumber;
    default:
      return state;
  }
};
