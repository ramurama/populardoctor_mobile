import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import {
  SECONDARY,
  HELPER_TEXT_COLOR,
  STATUS_AVAILABLE_COLOR,
  STATUS_NOT_AVAILABLE_COLOR
} from '../config/colors';
import PropTypes from 'prop-types';
import { FONT_M, FONT_XXS, FONT_XL } from '../config/fontSize';
import { FONT_WEIGHT_BOLD } from '../config/fontWeight';

const propTypes = {
  hospitalName: PropTypes.string.isRequired,
  hospitalAddress: PropTypes.string.isRequired,
  hospitalPinCode: PropTypes.string.isRequired,
  hospitalTime: PropTypes.string.isRequired,
  isAvailable: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired
};

class ScheduleCard extends Component {
  _renderHospitalDetails(
    hospitalName,
    hospitalAddress,
    hospitalPinCode,
    hospitalTime
  ) {
    const {
      hospitalContainer,
      hospitalAddressStyle,
      hospitalNameStyle,
      hospitalTimeStyle,
      timeSectionStyle,
      hospitalTimeIconStyle
    } = styles;
    const { streetName, building } = JSON.parse(hospitalAddress);
    return (
      <View style={hospitalContainer}>
        <Text style={hospitalNameStyle} numberOfLines={2} ellipsizeMode="tail">
          {hospitalName}
        </Text>
        <Text
          style={hospitalAddressStyle}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {`${building}, ${streetName} ${hospitalPinCode}`}
        </Text>
        <View style={timeSectionStyle}>
          <Icon
            style={[hospitalTimeStyle, hospitalTimeIconStyle]}
            name="watch-later"
            type="MaterialIcons"
          />
          <Text style={hospitalTimeStyle}>{hospitalTime}</Text>
        </View>
      </View>
    );
  }

  render() {
    const {
      isAvailable,
      hospitalName,
      hospitalAddress,
      hospitalPinCode,
      hospitalTime,
      onPress
    } = this.props;

    const { containerStyle, statusContainer, iconStyle } = styles;

    let bookingContainer = styles.isNotAvailable;
    let statusAvailable = styles.isWhite;

    if (isAvailable) {
      bookingContainer = styles.isAvailable;
      statusAvailable = styles.statusAvailable;
    } else {
      statusAvailable = styles.statusNotAvailable;
    }

    return (
      <TouchableOpacity onPress={onPress} style={containerStyle}>
        <View style={statusContainer}>
          <View style={[styles.statusIndicatorStyle, statusAvailable]} />
        </View>
        {this._renderHospitalDetails(
          hospitalName,
          hospitalAddress,
          hospitalPinCode,
          hospitalTime
        )}
        <View style={bookingContainer}>
          <Icon style={iconStyle} name="arrow-right" type="SimpleLineIcons" />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    margin: 5
  },
  statusContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  hospitalContainer: {
    flex: 4,
    justifyContent: 'space-around',
    padding: 8
  },
  timeSectionStyle: {
    flexDirection: 'row'
  },
  hospitalAddressStyle: {
    fontSize: FONT_XXS,
    color: HELPER_TEXT_COLOR,
    paddingTop: 8,
    paddingBottom: 8
  },
  hospitalNameStyle: {
    fontSize: FONT_M,
    color: SECONDARY,
    fontWeight: FONT_WEIGHT_BOLD
  },
  hospitalTimeStyle: {
    color: HELPER_TEXT_COLOR,
    fontSize: FONT_XXS,
    paddingRight: 3
  },
  hospitalTimeIconStyle: {
    fontSize: 15
    // paddingTop: 0
  },
  iconStyle: {
    color: 'white',
    fontSize: FONT_XL
  },
  isAvailable: {
    backgroundColor: SECONDARY,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  isNotAvailable: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  statusIndicatorStyle: {
    borderRadius: 35,
    height: 12,
    width: 12
  },
  statusAvailable: {
    backgroundColor: STATUS_AVAILABLE_COLOR
  },
  statusNotAvailable: {
    backgroundColor: STATUS_NOT_AVAILABLE_COLOR
  }
});
export default ScheduleCard;
