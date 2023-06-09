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
  ACTION_SET_CONFIRMED_SCHEDULES,
  ACTION_SET_LOCATION,
  ACTION_SET_LOCATION_LIST,
  ACTION_SET_SPECIALIZATIONS,
  ACTION_SET_RECEIVED_INITIAL_DATA,
  ACTION_SET_BOOKING_WITHOUT_FEEDBACK,
  ACTION_SET_USER_CURRENT_BOOKINGS,
  ACTION_SET_USER_PAST_BOOKINGS,
  ACTION_SET_DOCTOR_PD_NUMBER
} from '../constants/actionTypes';

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

export const setLocation = location => ({
  type: ACTION_SET_LOCATION,
  location
});

export const setLocationsList = locationsList => ({
  type: ACTION_SET_LOCATION_LIST,
  locationsList
});

export const setSpecializations = specializations => ({
  type: ACTION_SET_SPECIALIZATIONS,
  specializations
});

export const setReceivedInitialData = receivedInitialData => ({
  type: ACTION_SET_RECEIVED_INITIAL_DATA,
  receivedInitialData
});

export const setBookingWithoutFeedback = bookingWithoutFeedback => ({
  type: ACTION_SET_BOOKING_WITHOUT_FEEDBACK,
  bookingWithoutFeedback
});

export const setUserCurrentBookings = userCurrentBookings => ({
  type: ACTION_SET_USER_CURRENT_BOOKINGS,
  userCurrentBookings
});

export const setUserPastBookings = userPastBookings => ({
  type: ACTION_SET_USER_PAST_BOOKINGS,
  userPastBookings
});

export const setDoctorPdNumber = doctorPdNumber => ({
  type: ACTION_SET_DOCTOR_PD_NUMBER,
  doctorPdNumber
});
