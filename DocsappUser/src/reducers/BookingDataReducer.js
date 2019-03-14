import { ACTION_SET_BOOKING_DATA } from "../constants/actionTypes";

/**
 * tokenType
 * tokenNumber
 * tokenTyme
 * doctorName,
 * doctorId,
 * specialization,
 * scheduleId,
 * weekday,
 * hospital,
 * startTime,
 * endTime,
 * tokenDate
 */
export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_SET_BOOKING_DATA:
      return action.bookingData;
    default:
      return state;
  }
};
