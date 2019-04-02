import React from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { Container, Content, Text } from "native-base";
import Header from "../../components/HeaderDoctor";
import Footer from "../../components/FooterFrontDesk";
import { DR_SCHEDULE } from "../../constants/strings";
import commonStyles from "../../commons/styles";
import { VIEW_DR_SCHEDULE } from "../../constants/viewNames";
import Spinner from "react-native-loading-spinner-overlay";
import { WHITE, HELPER_TEXT_COLOR } from "../../config/colors";
import APIService from "../../services/APIService";
import { connect } from "react-redux";
import * as Actions from "../../actions";
import { isNullOrEmpty, isStringsEqual } from "../../commons/utils";
import { USER_FRONT_DESK } from "../../constants/userType";
import StausAvailability from "../../components/StatusAvailability";
import Toast from "react-native-simple-toast";

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false
    };
  }

  componentDidMount() {
    const { token, confirmedSchedules, setConfirmedSchedules } = this.props;
    APIService.getConfirmedSchedules(token, USER_FRONT_DESK, schedules => {
      this.props.setConfirmedSchedules(schedules);
    });
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
        hospital={hospitalName + ", " + hospitalLocation}
        time={startTime + " - " + endTime}
        onBlockPress={() => {
          Alert.alert(
            "Warning!",
            "Blocking a schedule cannot be undone! Are you sure?",
            [
              { text: "No" },
              {
                text: "Yes",
                onPress: () => {
                  APIService.blockSchedule(
                    this.props.token,
                    tokenTableId,
                    USER_FRONT_DESK,
                    status => {
                      if (status) {
                        Toast.show("Schedule has been blocked");
                      } else {
                        Toast.show("Unknown error!");
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

  render() {
    return (
      <Container>
        {this._renderHeader()}
        <Content padder style={commonStyles.contentBg}>
          <View>{this._renderConfirmedSchedulesList()}</View>
        </Content>
        <Footer {...this.props} activeButton={DR_SCHEDULE} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  confirmedSchedules: state.confirmedSchedules
});

export default connect(
  mapStateToProps,
  Actions
)(Schedule);

const styles = StyleSheet.create({});
