import __ from "underscore";

export const toUpperCaseFirstOfEachWord = str => {
  let splitStr = str.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
};

export const isPasswordLengthOk = password => {
  const MIN_LENGTH = 6;
  if (__.size(password) >= MIN_LENGTH) {
    return true;
  }
  return false;
};

export const isStringsEqual = (str1, str2) => {
  if (__.isEqual(str1, str2)) {
    return true;
  }
  return false;
};

export const isNullOrEmpty = obj => {
  if (__.isNull(obj) || __.isEmpty(obj)) {
    return true;
  }
  return false;
};

export const isNotUndefined = obj => {
  if (__.isUndefined(obj)) {
    return false;
  }
  return true;
};

export const isValidMobileNumber = number => {
  if (__.isEqual(__.size(number), 10)) {
    return true;
  }
  return false;
};

export const getDateString = date => {
  return (
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2)
  );
};
