import { AsyncStorage } from "react-native";
import { isNullOrEmpty } from "../commons/utils";

export const AsyncDataService = {
  async setItem(key, value, isJSON) {
    if (isJSON) {
      value = JSON.stringify(value);
    }
    let status = await AsyncStorage.setItem(key, value);
    if (!status) {
      return false;
    }
    return true;
  },

  async getItem(key, isJSON) {
    let value = await AsyncStorage.getItem(key);
    if (isNullOrEmpty(value)) {
      return null;
    }
    if (isJSON) {
      return JSON.parse(value);
    }
    return value;
  }
};
