import {
  ACTION_SET_NETWORK_CONN_STATUS,
  ACTION_SET_TOKEN,
  ACTION_SET_USER_TYPE,
  ACTION_SET_CUSTOMER_SIGNUP_DATA,
  ACTION_SET_USER_DATA,
  ACTION_SET_SEARCH_CRITERIA,
  ACTION_SET_BOOKING_DATA,
  ACTION_SET_FAVORITES,
  ACTION_SET_SCHEDULE_CONFIRMATION_DATA,
  ACTION_SET_DR_BOOKING_HISTORY,
  ACTION_SET_USER_SUPPORT,
  ACTION_SET_CURRENT_BOOKINGS,
  ACTION_SET_IS_PREMIUM_USER,
  ACTION_SET_CONFIRMED_SCHEDULES
} from "../constants/actionTypes";

export const setNetworkConnStatus = isNetworkConnected => ({
  type: ACTION_SET_NETWORK_CONN_STATUS,
  isNetworkConnected
});

export const setToken = token => ({
  type: ACTION_SET_TOKEN,
  token
});

export const setUserType = userType => ({
  type: ACTION_SET_USER_TYPE,
  userType
});

export const setCustomerSignUpData = customerData => ({
  type: ACTION_SET_CUSTOMER_SIGNUP_DATA,
  customerData
});

export const setUserData = userData => ({
  type: ACTION_SET_USER_DATA,
  userData
});

export const setSearchCriteria = searchCriteria => ({
  type: ACTION_SET_SEARCH_CRITERIA,
  searchCriteria
});

export const setBookingData = bookingData => ({
  type: ACTION_SET_BOOKING_DATA,
  bookingData
});

export const setFavorites = favorites => ({
  type: ACTION_SET_FAVORITES,
  favorites
});

export const setScheduleConfirmations = scheduleConfirmations => ({
  type: ACTION_SET_SCHEDULE_CONFIRMATION_DATA,
  scheduleConfirmations
});

export const setDoctorBookingHistory = drBookingHistory => ({
  type: ACTION_SET_DR_BOOKING_HISTORY,
  drBookingHistory
});

export const setUserSupport = userSupport => ({
  type: ACTION_SET_USER_SUPPORT,
  userSupport
});

export const setCurrentBookings = currentBookings => ({
  type: ACTION_SET_CURRENT_BOOKINGS,
  currentBookings
});

export const setIsPremiumUser = isPremiumUser => ({
  type: ACTION_SET_IS_PREMIUM_USER,
  isPremiumUser
});

export const setConfirmedSchedules = confirmedSchedules => ({
  type: ACTION_SET_CONFIRMED_SCHEDULES,
  confirmedSchedules
});
