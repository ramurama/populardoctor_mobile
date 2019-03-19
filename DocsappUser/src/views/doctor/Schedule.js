import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Container, Content, Text } from "native-base";
import Header from "../../components/HeaderDoctor";
import Footer from "../../components/FooterDoctor";
import { DR_SCHEDULE } from "../../constants/strings";
import commonStyles from "../../commons/styles";
import { VIEW_DR_SCHEDULE } from "../../constants/viewNames";
import ConfirmationCard from "../../components/ConfirmationCard";
import Spinner from "react-native-loading-spinner-overlay";
import { WHITE } from "../../config/colors";
import APIService from "../../services/APIService";
import { connect } from "react-redux";
import * as Actions from "../../actions";
import { isNullOrEmpty, isStringsEqual } from "../../commons/utils";

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false
    };
  }

  componentDidMount() {
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
    const content =
      "Is your schedule for tomorrow " +
      startTime +
      " to " +
      endTime +
      " at " +
      hospitalDetails.name +
      ", " +
      hospitalDetails.address +
      " is confirmed?";
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

  render() {
    return (
      <Container>
        {this._renderHeader()}
        <Content style={commonStyles.contentBg}>
          <View>{this._renderScheduleConfirmationList()}</View>
          {this._renderSpinner()}
        </Content>
        <Footer {...this.props} activeButton={DR_SCHEDULE} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  scheduleConfirmations: state.scheduleConfirmations
});

export default connect(
  mapStateToProps,
  Actions
)(Schedule);

const styles = StyleSheet.create({});
