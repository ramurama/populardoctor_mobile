import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { SECONDARY, PRIMARY } from '../config/colors';
import { FONT_XS, FONT_L } from '../config/fontSize';
import { FONT_WEIGHT_MEDIUM, FONT_WEIGHT_XXBOLD } from '../config/fontWeight';
import PropTypes from 'prop-types';

const propTypes = {
  month: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  unmatching: PropTypes.string.isRequired,
  isActive: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

class CalendarSlot extends Component {
  render() {
    const {
      dayContainerStyle,
      monthStyle,
      dateStyle,
      dayStyle,
      activeContainer,
      activeColor,
      unmatchingMonthStyle,
      unmatchingDateStyle
    } = styles;

    const { month, date, day, onPress } = this.props;

    const containerStyle = this.props.isActive
      ? [dayContainerStyle, activeContainer]
      : dayContainerStyle;

    const monthStateStyle = this.props.isActive
      ? [monthStyle, activeColor]
      : this.props.unmatching
      ? unmatchingMonthStyle
      : monthStyle;

    const dayStateStyle = this.props.isActive
      ? [dayStyle, activeColor]
      : dayStyle;

    const dateStateStyle = this.props.isActive
      ? [dateStyle, activeColor]
      : this.props.unmatching
      ? unmatchingDateStyle
      : dateStyle;

    return (
      <TouchableOpacity style={containerStyle} onPress={onPress}>
        <Text style={monthStateStyle}>{month}</Text>
        <Text style={dateStateStyle}>{date}</Text>
        <Text style={dayStateStyle}>{day}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  dayContainerStyle: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: 'lightgrey'
  },
  monthStyle: {
    fontSize: FONT_XS,
    fontWeight: FONT_WEIGHT_MEDIUM,
    color: SECONDARY
  },
  dateStyle: {
    fontSize: FONT_L,
    fontWeight: FONT_WEIGHT_XXBOLD,
    color: SECONDARY
  },
  dayStyle: {
    fontSize: FONT_XS,
    color: 'grey'
  },
  activeColor: {
    color: PRIMARY
  },
  activeContainer: {
    backgroundColor: SECONDARY
  },
  unmatchingMonthStyle: {
    fontSize: FONT_XS,
    fontWeight: FONT_WEIGHT_MEDIUM,
    color: 'grey'
  },
  unmatchingDateStyle: {
    fontSize: FONT_L,
    fontWeight: FONT_WEIGHT_XXBOLD,
    color: 'grey'
  }
});
export default CalendarSlot;
