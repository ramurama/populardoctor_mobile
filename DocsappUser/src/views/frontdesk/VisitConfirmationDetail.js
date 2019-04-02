import React from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Container, Content, Text, Footer } from "native-base";
import commonStyles from "../../commons/styles";
import { SECONDARY, PRIMARY } from "../../config/colors";
import DoctorBooking from "../../components/DoctorBooking";
import VisitConfirmedIcon from "../../components/VisitConfirmedIcon";
import { FONT_L } from "../../config/fontSize";
import { FONT_WEIGHT_BOLD } from "../../config/fontWeight";
import Spinner from "react-native-loading-spinner-overlay";
import { WHITE } from "../../config/colors";
import APIService from "../../services/APIService";
import { connect } from "react-redux";
import { isNullOrEmpty, getDateStringIndian } from "../../commons/utils";
import { USER_FRONT_DESK } from "../../constants/userType";

class VisitConfirmationDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      isConfirmed: false,
      bookingDetail: null
    };
  }

  componentDidMount() {
    const bookingId = this.props.navigation.getParam("bookingId");
    console.log(bookingId);
    this.setState({ spinner: true }, () => {
      APIService.getDoctorBookingDetail(
        this.props.token,
        bookingId,
        USER_FRONT_DESK,
        data => {
          console.log(data);
          const { status, message, bookingDetail } = data;
          this.setState({ spinner: false }, () =>
            setTimeout(() => {
              if (status) {
                this.setState({ bookingDetail });
              } else {
                Alert.alert("Sorry!", message, [
                  { text: "Ok!", onPress: () => this.props.navigation.goBack() }
                ]);
              }
            }, 100)
          );
        }
      );
    });
  }

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} textStyle={{ color: WHITE }} />
    );
  }

  _handleConfirmButton = () => {
    const bookingId = this.props.navigation.getParam("bookingId");
    this.setState({ spinner: true }, () => {
      APIService.confirmVisit(
        this.props.token,
        bookingId,
        USER_FRONT_DESK,
        status => {
          this.setState({ spinner: false, isConfirmed: true });
        }
      );
    });
  };

  _renderConfirmButton() {
    return (
      <TouchableOpacity onPress={this._handleConfirmButton}>
        <Footer style={[styles.footer, commonStyles.shadow]}>
          <Text style={styles.doneButtonText}>Confirm</Text>
        </Footer>
      </TouchableOpacity>
    );
  }

  render() {
    const { bookingDetail } = this.state;
    return (
      <Container>
        <Content style={commonStyles.contentBg}>
          <View style={{ flex: 1 }}>
            {!isNullOrEmpty(bookingDetail) && (
              <DoctorBooking
                bookingDate={getDateStringIndian(
                  new Date(bookingDetail.tokenDate)
                )}
                bookingId={bookingDetail.bookingId}
                tokenNumber={bookingDetail.token.number}
                tokenType={bookingDetail.token.type}
                tokenTime={bookingDetail.token.time}
                visitorName={bookingDetail.userDetails.fullName}
                visitorMobile={bookingDetail.userDetails.username}
                hospitalName={bookingDetail.hospitalDetails.name}
              />
            )}
          </View>
          {this.state.isConfirmed && <VisitConfirmedIcon />}
          {this._renderSpinner()}
        </Content>
        {!this.state.isConfirmed && this._renderConfirmButton()}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token
});

export default connect(mapStateToProps)(VisitConfirmationDetail);

const styles = StyleSheet.create({
  doneButtonText: {
    color: PRIMARY,
    alignSelf: "center",
    fontSize: FONT_L,
    fontWeight: FONT_WEIGHT_BOLD
  },
  footer: {
    backgroundColor: SECONDARY
  }
});
