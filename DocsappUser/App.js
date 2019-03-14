import React from "react";
import { Provider } from "react-redux";
import { AsyncStorage } from "react-native";
import firebase from "react-native-firebase";
import { createStore } from "redux";
import { Root } from "native-base";
import Reducers from "./src/reducers";
import Main from "./src/views/Main";
import StatusBar from "./src/components/StatusBar";
import { KEY_FCM_TOKEN } from "./src/constants/AsyncDataKeys";

console.disableYellowBox = true;

export default class App extends React.Component {
  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
  }
  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const { title, body } = notification;
        this.showAlert(title, body);
      });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title,
      body,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }

  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getDeviceToken();
    } else {
      this.requestPermission();
    }
  }

  async getDeviceToken() {
    let fcmToken = await AsyncStorage.getItem(KEY_FCM_TOKEN);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem(KEY_FCM_TOKEN, fcmToken);
      }
    }
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getDeviceToken();
    } catch (error) {
      // User has rejected permissions
      console.log("permission rejected");
    }
  }

  render() {
    return (
      <Provider store={createStore(Reducers)}>
        <Root>
          <StatusBar />
          <Main />
        </Root>
      </Provider>
    );
  }
}
