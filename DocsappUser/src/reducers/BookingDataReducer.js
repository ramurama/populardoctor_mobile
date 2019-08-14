import { ACTION_SET_BOOKING_DATA } from "../constants/actionTypes";

/**
 * tokenType
 * tokenNumber
 * tokenDate
 * tokenTime
 * doctorName,
 * doctorId,
 * specialization,
 * scheduleId,
 * weekday,
 * hospital,
 * startTime,
 * endTime,
 */
export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_SET_BOOKING_DATA:
      return action.bookingData;
    default:
      return state;
  }
};
