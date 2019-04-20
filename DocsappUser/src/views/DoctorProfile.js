import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Container, Content, Text, Icon } from 'native-base';
import { BACKGROUND_1, SECONDARY, PRIMARY, WHITE } from '../config/colors';
import Calendar from '../components/CalendarSlot';
import DoctorProfileCard from '../components/DoctorProfileCard';
import ScheduleCard from '../components/ScheduleCard';
import {
  VIEW_BOOK_APPOINTMENT,
  VIEW_DOCTOR_DESCRIPTION,
  VIEW_HOME_FAV_DR_DESCRIPTION,
  VIEW_HOME_FAV_BOOK_APPOINTMENT
} from '../constants/viewNames';
import Moment from 'moment';
import { FONT_M, FONT_S } from '../config/fontSize';
import Spinner from 'react-native-loading-spinner-overlay';
import APIService from '../services/APIService';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { isNullOrEmpty, isStringsEqual, getDateString } from '../commons/utils';
import Toast from 'react-native-simple-toast';

const DATE_FORMAT = 'MMM DD YYYY';

class DoctorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      selectedDateStr: '',
      selectedDay: '',
      doctorDetails: {},
      schedules: [],
      availabilityStatus: []
    };
  }

  componentDidMount() {
    this.setState({ spinner: true }, () => {
      const date = this._computeTodayDate();
      //fetch all schedules for the seletect doctor
      const userId = this.props.navigation.getParam('userId');
      APIService.getSchedules(this.props.token, userId, drSchedules => {
        console.log(drSchedules);
        const { schedules, doctorDetails, availabilityStatus } = drSchedules;
        this.setState({
          schedules,
          doctorDetails,
          availabilityStatus,
          selectedDateStr: date.dateStr,
          selectedDay: date.day,
          selectedDateString: date.normalDateStr,
          spinner: false
        });
      });
    });
  }

  _computeTodayDate() {
    let todayDate = new Date();
    let today = new Moment(todayDate, DATE_FORMAT).toDate();
    let dateStringArr = today.toDateString().split(' ');
    const day = dateStringArr[0];
    const month = dateStringArr[1];
    const date = dateStringArr[2];
    const dateStr = day + ' ' + date + ', ' + month;
    //this normalDate will be updated to redux state as tokenDate
    let normalDateStr = getDateString(todayDate);
    return { dateStr, day, normalDateStr };
  }

  _handleCalendarSelect = selectedDate => {
    const { date, dateString } = selectedDate;
    // alert(JSON.stringify(selectedDate));
    const selectedDateStr = date.day + ' ' + date.date + ', ' + date.month;
    this.setState({
      selectedDateStr,
      selectedDay: date.day,
      selectedDateString: dateString
    });
  };

  _handleProfileIconPress = () => {
    const screenOpenedFromHome = this.props.navigation.getParam(
      'screenOpenedFromHome'
    );
    let drDescriptionView = VIEW_DOCTOR_DESCRIPTION;
    if (screenOpenedFromHome) {
      drDescriptionView = VIEW_HOME_FAV_DR_DESCRIPTION;
    }
    this.props.navigation.navigate(drDescriptionView, {
      profileContent: this.state.doctorDetails.profileContent
    });
  };

  _renderDoctorProfileCard() {
    const { specialization, yearsOfExperience } = this.state.doctorDetails;
    const { navigation } = this.props;
    const doctorName = navigation.getParam('doctorName');
    const profileImage = navigation.getParam('profileImage');
    const isFavorite = navigation.getParam('isFavorite');
    return (
      <DoctorProfileCard
        imageURL={profileImage}
        isFavorite={isFavorite}
        specialization={specialization}
        doctorName={doctorName}
        years={yearsOfExperience}
        onProfileIconPress={this._handleProfileIconPress}
        onFavoriteIconPress={this._handleFavoriteIconPress}
      />
    );
  }

  _handleFavoriteIconPress = isFavorite => {
    const { token } = this.props;
    const userId = this.props.navigation.getParam('userId');
    if (isFavorite) {
      //add to favorites
      APIService.addFavorite(token, userId, (status, favorites) => {
        if (status) {
          this.props.setFavorites(favorites);
          Toast.show('Added to favorites', Toast.SHORT);
        } else {
          Toast.show('Error adding to favorites', Toast.SHORT);
        }
      });
    } else {
      //remove from favorites
      APIService.removeFavorite(token, userId, (status, favorites) => {
        if (status) {
          this.props.setFavorites(favorites);
          Toast.show('Removed from favorites', Toast.SHORT);
        } else {
          Toast.show('Error removing from favorites', Toast.SHORT);
        }
      });
    }
  };

  _renderScheduleListItem(item) {
    const screenOpenedFromHome = this.props.navigation.getParam(
      'screenOpenedFromHome'
    );
    const { hospital, startTime, endTime, weekday, scheduleId } = item;
    const { availabilityStatus, selectedDateStr, doctorDetails } = this.state;
    const isBookingOpen = availabilityStatus.some(
      availStatus =>
        isStringsEqual(availStatus.scheduleId, item.scheduleId) &&
        availStatus.isBookingOpen
    );
    return (
      <ScheduleCard
        isAvailable={isBookingOpen}
        hospitalName={hospital.name}
        hospitalAddress={hospital.address + ' ' + hospital.pincode}
        hospitalTime={startTime + ' - ' + endTime}
        onPress={() => {
          this.props.setBookingData({
            doctorId: doctorDetails._id,
            scheduleId,
            weekday,
            hospital,
            startTime,
            endTime,
            doctorName: this.props.navigation.getParam('doctorName'),
            specialization: this.state.doctorDetails.specialization,
            tokenDate: this.state.selectedDateString
          });

          let bookAppointmentView = VIEW_BOOK_APPOINTMENT;
          if (screenOpenedFromHome) {
            bookAppointmentView = VIEW_HOME_FAV_BOOK_APPOINTMENT;
          }
          this.props.navigation.navigate(bookAppointmentView, {
            title: selectedDateStr,
            isBookingOpen,
            screenOpenedFromHome
          });
        }}
      />
    );
  }

  _renderScheduleList() {
    const { schedules, selectedDay } = this.state;
    const data = schedules
      .map(element => {
        if (isStringsEqual(element.weekday, selectedDay)) {
          return element;
        }
      })
      .filter(element => {
        return element !== undefined;
      });
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => this._renderScheduleListItem(item)}
        scrollEnabled
        style={{ flexGrow: 1 }}
        keyExtractor={(item, index) => {
          item.scheduleId;
        }}
      />
    );
  }

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} textStyle={{ color: WHITE }} />
    );
  }

  render() {
    return (
      <Container>
        <View>{this._renderDoctorProfileCard()}</View>
        <View style={styles.scheduleView}>
          <Text style={styles.textStyle}>Week Schedule</Text>
          <Calendar onSelect={this._handleCalendarSelect} />
        </View>
        <Content style={styles.contentStyle} scrollEnabled={true}>
          <View style={styles.scheduleListView}>
            {this._renderScheduleList()}
          </View>
          {this._renderSpinner()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  bookingData: state.bookingData,
  location: state.location
});

export default connect(
  mapStateToProps,
  Actions
)(DoctorProfile);

const styles = StyleSheet.create({
  contentStyle: {
    backgroundColor: BACKGROUND_1,
    flex: 1
  },
  textStyle: {
    fontSize: FONT_S,
    fontWeight: '100',
    color: 'grey',
    margin: 5
  },
  textViewStyle: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  weekIconStyle: {
    color: 'grey',
    fontSize: FONT_M
  },
  scheduleView: {
    marginTop: 0,
    alignItems: 'center',
    backgroundColor: PRIMARY
  },
  scheduleListView: {
    flex: 1,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10
  }
});
