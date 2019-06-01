import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarSection from './CalendarSection';
import Moment from 'moment';
import PropTypes from 'prop-types';

const propTypes = {
  onSelect: PropTypes.func.isRequired,
  unmatchingDays: PropTypes.array.isRequired
};

const DATE_FORMAT = 'MMM DD YYYY';

class CalendarSlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSlot: 0
    };
    this.dates = [];
    this.dateStrings = [];
  }

  componentWillMount() {
    this.dates = [];
    this._computeDate();
  }

  _computeDate() {
    let todayDate = new Date();
    let today = new Moment(todayDate, DATE_FORMAT).toDate();
    this.dateStrings.push(this._computeDateString(today));
    this.dates.push(this._splitDate(today.toDateString()));
    console.log(today);
    for (count = 1; count < 7; count++) {
      let date = new Date();
      date.setDate(date.getDate() + count);
      this.dateStrings.push(this._computeDateString(date));
      this.dates.push(this._splitDate(date.toDateString()));
    }
    console.log(this.dates);
  }

  _computeDateString(date) {
    return (
      date.getFullYear() +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2)
    );
  }

  _splitDate(dateStr) {
    let dateStringArr = dateStr.split(' ');
    return {
      day: dateStringArr[0],
      month: dateStringArr[1],
      date: dateStringArr[2]
    };
  }

  render() {
    const { ContainerStyle } = styles;
    return (
      <View style={ContainerStyle}>
        {this.dates.map((dateItem, index) => (
          <CalendarSection
            month={dateItem.month}
            date={dateItem.date}
            day={dateItem.day}
            unmatching={this.props.unmatchingDays.includes(dateItem.day)}
            isActive={this.state.selectedSlot == index}
            onPress={() =>
              this.setState({ selectedSlot: index }, () =>
                this.props.onSelect({
                  date: this.dates[index],
                  dateString: this.dateStrings[index]
                })
              )
            }
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ContainerStyle: {
    height: 70,
    flexDirection: 'row',
    padding: 4,
    backgroundColor: 'white',
    marginBottom: 5,
    shadowColor: '#ffffff',
    shadowOffset: { width: 2, height: 2 },
    elevation: 5,
    shadowOpacity: 0.4
  }
});
export default CalendarSlot;
