import { AsyncStorage } from "react-native";
import { isNullOrEmpty } from "../commons/utils";

export const AsyncDataService = {
  async setItem(key, value, isJSON) {
    if (isJSON) {
      value = JSON.stringify(value);
    }
    try {
      let status = await AsyncStorage.setItem(key, value);
      if (!status) {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  },

  async getItem(key, isJSON) {
    try {
      let value = await AsyncStorage.getItem(key);
      if (isNullOrEmpty(value)) {
        return null;
      }
      if (isJSON) {
        return JSON.parse(value);
      }
      return value;
    } catch (err) {
      return null;
    }
  }
};
