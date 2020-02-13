import React from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Container, Content, Text } from 'native-base';
import Header from '../../components/HeaderDoctor';
import Footer from '../../components/FooterDoctor';
import { DR_SCHEDULE } from '../../constants/strings';
import commonStyles from '../../commons/styles';
import { VIEW_DR_SCHEDULE } from '../../constants/viewNames';
import ConfirmationCard from '../../components/ConfirmationCard';
import Spinner from 'react-native-loading-spinner-overlay';
import { WHITE, HELPER_TEXT_COLOR } from '../../config/colors';
import APIService from '../../services/APIService';
import { connect } from 'react-redux';
import * as Actions from '../../actions';
import { isNullOrEmpty, isStringsEqual } from '../../commons/utils';
import StausAvailability from '../../components/StatusAvailability';
import Toast from 'react-native-simple-toast';
import { USER_DOCTOR } from '../../constants/userType';

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false
    };
  }

  componentDidMount() {
    //get confirmed schedules
    const { token, confirmedSchedules, setConfirmedSchedules } = this.props;
    APIService.getConfirmedSchedules(token, USER_DOCTOR, schedules => {
      this.props.setConfirmedSchedules(schedules);
    });

    //get schedule confirmations
    if (isNullOrEmpty(this.props.scheduleConfirmations)) {
      this.setState({ spinner: true }, () => {
        APIService.getNextDayScheduleConfirmations(this.props.token, data => {
          const { schedules, tokenDate } = data;
          this.setState({ spinner: false }, () =>
            this.props.setScheduleConfirmations({
              schedules,
              tokenDate
            })
          );
        });
      });
    }
  }

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} textStyle={{ color: WHITE }} />
    );
  }

  _renderHeader() {
    return (
      <Header
        title={DR_SCHEDULE}
        {...this.props}
        sourceRoute={VIEW_DR_SCHEDULE}
      />
    );
  }

  _renderScheduleConfirmationListItem(item) {
    const { tokenDate, schedules } = this.props.scheduleConfirmations;
    const { startTime, endTime, hospitalDetails, _id } = item;
    const { streetName, building } = hospitalDetails.address;
    const content =
      'Is your schedule for tomorrow ' +
      startTime +
      ' to ' +
      endTime +
      ' at ' +
      hospitalDetails.name +
      ', ' +
      streetName +
      ' ' +
      building +
      ' is confirmed?';
    return (
      <ConfirmationCard
        content={content}
        okText="Yes"
        cancelText="No"
        onOk={() => {
          this.setState({ spinner: true }, () => {
            APIService.confirmSchedule(
              this.props.token,
              {
                scheduleId: _id,
                tokenDate
              },
              status => {
                if (status) {
                  this.setState({ spinner: false }, () =>
                    this._removeScheduleConfirmation(schedules, _id)
                  );
                }
              }
            );
          });
        }}
        onCancel={() => this._removeScheduleConfirmation(schedules, _id)}
      />
    );
  }

  _removeScheduleConfirmation(schedules, scheduleId) {
    const removeIndex = schedules.findIndex(schedule =>
      isStringsEqual(schedule._id, scheduleId)
    );
    let tempSchedules = schedules;
    tempSchedules.splice(removeIndex, 1);
    this.props.setScheduleConfirmations({
      ...this.props.scheduleConfirmations,
      schedules: tempSchedules
    });
  }

  _renderScheduleConfirmationList() {
    return (
      <FlatList
        data={this.props.scheduleConfirmations.schedules}
        extraData={this.props}
        keyExtractor={(item, index) => item._id}
        renderItem={({ item }) =>
          this._renderScheduleConfirmationListItem(item)
        }
      />
    );
  }

  _renderConfirmedSchedulesList() {
    return (
      <FlatList
        data={this.props.confirmedSchedules}
        renderItem={({ item }) => this._renderConfirmedScheduleListItem(item)}
        keyExtractor={(item, index) => item.tokenTableId}
        extraData={this.props}
      />
    );
  }

  _renderConfirmedScheduleListItem(item) {
    const {
      hospitalName,
      hospitalLocation,
      startTime,
      endTime,
      tokenTableId
    } = item;
    return (
      <StausAvailability
        hospital={hospitalName + ', ' + hospitalLocation}
        time={startTime + ' - ' + endTime}
        onBlockPress={() => {
          Alert.alert(
            'Warning!',
            'Blocking a schedule cannot be undone! Are you sure?',
            [
              { text: 'No' },
              {
                text: 'Yes',
                onPress: () => {
                  APIService.blockSchedule(
                    this.props.token,
                    tokenTableId,
                    USER_DOCTOR,
                    status => {
                      if (status) {
                        Toast.show('Schedule has been blocked');
                      } else {
                        Toast.show('Unknown error!');
                      }
                    }
                  );
                }
              }
            ]
          );
        }}
      />
    );
  }

  _renderNoScheduleConfirmations() {
    return (
      <View style={styles.noConfirmationsView}>
        <Text style={styles.noConfirmationsText} numberOfLines={2}>
          Your schedules for tomorrow are confirmed.
        </Text>
      </View>
    );
  }

  render() {
    const { schedules } = this.props.scheduleConfirmations;
    return (
      <Container>
        {this._renderHeader()}
        <Content style={commonStyles.contentBg} padder>
          {isNullOrEmpty(schedules) &&
            isNullOrEmpty(this.props.confirmedSchedules) &&
            this._renderNoScheduleConfirmations()}
          {this._renderConfirmedSchedulesList()}
          {this._renderScheduleConfirmationList()}
          {this._renderSpinner()}
        </Content>
        <Footer {...this.props} activeButton={DR_SCHEDULE} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  scheduleConfirmations: state.scheduleConfirmations,
  confirmedSchedules: state.confirmedSchedules
});

export default connect(mapStateToProps, Actions)(Schedule);

const styles = StyleSheet.create({
  noConfirmationsText: {
    alignSelf: 'center',
    color: HELPER_TEXT_COLOR,
    textAlign: 'center'
  },
  noConfirmationsView: { marginTop: 30 }
});
