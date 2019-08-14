import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Icon } from 'native-base';
import {
  HELPER_TEXT_COLOR,
  BACKGROUND_2,
  STATUS_AVAILABLE_COLOR
} from '../config/colors';
import * as Animatable from 'react-native-animatable';
import { FONT_WEIGHT_BOLD } from '../config/fontWeight';

const SCREEN_W = Dimensions.get('window').width;

function VisitConfirmedIcon() {
  return (
    <Animatable.View
      animation='pulse'
      easing='ease-out'
      iterationCount='infinite'
      style={styles.mainView}
    >
      <Icon name='checkcircleo' type='AntDesign' style={styles.iconStyle} />
      <Text style={styles.textStyle}>Visit Confirmed</Text>
    </Animatable.View>
  );
}

export default VisitConfirmedIcon;

const styles = StyleSheet.create({
  iconStyle: {
    fontSize: SCREEN_W * 0.25,
    color: STATUS_AVAILABLE_COLOR,
    alignSelf: 'center'
  },
  textStyle: {
    alignSelf: 'center',
    color: HELPER_TEXT_COLOR,
    fontSize: SCREEN_W * 0.06,
    fontWeight: FONT_WEIGHT_BOLD
  },
  mainView: {
    flexDirection: 'column',
    paddingTop: 20,
    backgroundColor: BACKGROUND_2,
    paddingBottom: 10
  }
});
