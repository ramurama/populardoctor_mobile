import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  TextInput,
  Alert
} from "react-native";
import { Container, Content, Text, Footer, Item } from "native-base";
import commonStyles from "../../commons/styles";
import DoctorBooking from "../../components/DoctorBooking";
import {
  getDateStringIndian,
  isStringsEqual,
  isNullOrEmpty,
  removeElement
} from "../../commons/utils";
import ModalDialog from "react-native-modalbox";
import { FONT_L, FONT_XL, FONT_XXL } from "../../config/fontSize";
import { FONT_WEIGHT_BOLD } from "../../config/fontWeight";
import {
  DISABLED_GREY,
  SECONDARY,
  SECONDARY_DARK,
  WHITE
} from "../../config/colors";
import Spinner from "react-native-loading-spinner-overlay";
import APIService from "../../services/APIService";
import { connect } from "react-redux";
import * as Actions from "../../actions";
import VisitConfirmedIcon from "../../components/VisitConfirmedIcon";
import Toast from "react-native-simple-toast";
import { TOKEN_BOOKED, TOKEN_VISITED } from "../../constants/tokenStatus";

const SCREEN_W = Dimensions.get("window").width;

class CurrentBookingDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      isVerifyModalOpen: false,
      otp: "",
      showFooterButton: true
    };
  }

  componentDidMount() {
    const bookingId = this.props.navigation.getParam("bookingId");
    this.setState({ spinner: true }, () => {
      APIService.getBookingStatus(this.props.token, bookingId, bookedStatus => {
        this.setState({ spinner: false }, () =>
          setTimeout(() => {
            if (isStringsEqual(bookedStatus, TOKEN_VISITED)) {
              this.setState({ showFooterButton: false });
            }
          }, 100)
        );
      });
    });
  }

  _renderVeriftOtpButton() {
    return (
      <TouchableOpacity
        onPress={() => this.setState({ isVerifyModalOpen: true })}
      >
        <Footer style={commonStyles.footerButtonStyle}>
          <View style={commonStyles.footerButtonView}>
            <Text style={commonStyles.footerButtonText}>Verify OTP</Text>
          </View>
        </Footer>
      </TouchableOpacity>
    );
  }

  _renderVerifyOtpModal() {
    const isDisabled = this.state.otp.length !== 4;
    const verifyOtpTextStyle = [styles.verifyOtpText];
    if (isDisabled) {
      verifyOtpTextStyle.push({ color: DISABLED_GREY });
    }
    return (
      <ModalDialog
        style={[styles.verifyOtpModal, styles.verifyOtpDialogModal]}
        position={"center"}
        isDisabled={false}
        isOpen={this.state.isVerifyModalOpen}
        onClosed={() => this.setState({ isVerifyModalOpen: false })}
        backButtonClose={true}
        coverScreen={true}
      >
        <Text style={styles.verifyOtpModalDialogText}>OTP</Text>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Item style={styles.verifyOtpItem}>
            <TextInput
              style={[
                styles.verifyOtpModalTextInput,
                styles.verifyOtpInputText
              ]}
              placeholder={"_ _ _ _"}
              placeholderTextColor={SECONDARY}
              style={[styles.textInput, styles.inputText]}
              keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
              autoFocus
              maxLength={4}
              onChangeText={value => this.setState({ otp: value })}
            />
          </Item>
          <TouchableOpacity
            onPress={this._handleVerifyOtp}
            disabled={isDisabled}
          >
            <Text style={verifyOtpTextStyle}>Verify OTP</Text>
          </TouchableOpacity>
        </View>
      </ModalDialog>
    );
  }

  _handleVerifyOtp = () => {
    const bookingId = this.props.navigation.getParam("bookingId");
    const { otp } = this.state;

    this.setState({ isVerifyModalOpen: false, spinner: true }, () => {
      setTimeout(() => {
        APIService.verifyBookingOtp(this.props.token, bookingId, otp, data => {
          const { status, message } = data;
          this.setState({ spinner: false }, () => {
            if (status) {
              this.setState({ showFooterButton: false });
            } else {
              setTimeout(() => {
                Toast.show(message);
              }, 100);
            }
          });
        });
      }, 300);
    });
  };

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} textStyle={{ color: WHITE }} />
    );
  }

  render() {
    const { showFooterButton } = this.state;
    const bookingDetails = this.props.navigation.getParam("bookingDetails");
    const bookingId = this.props.navigation.getParam("bookingId");
    const { hospitalName, appointmentDate, visitorsList } = bookingDetails;
    const visitorDetails = visitorsList.find(visitor => {
      return isStringsEqual(bookingId, visitor.bookingId);
    });
    return (
      <Container>
        <Content style={commonStyles.contentBg}>
          <View style={{ flex: 1 }}>
            <DoctorBooking
              bookingDate={getDateStringIndian(new Date(appointmentDate))}
              bookingId={bookingId}
              tokenNumber={visitorDetails.tokenNumber}
              tokenType={visitorDetails.tokenType}
              tokenTime={visitorDetails.tokenTime}
              visitorName={visitorDetails.name}
              visitorMobile={visitorDetails.number}
              hospitalName={hospitalName}
            />
          </View>
          {this._renderSpinner()}
          {!showFooterButton && <VisitConfirmedIcon />}
        </Content>
        {showFooterButton && this._renderVeriftOtpButton()}
        {this._renderVerifyOtpModal()}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  currentBookings: state.currentBookings
});

export default connect(
  mapStateToProps,
  Actions
)(CurrentBookingDetail);

const styles = StyleSheet.create({
  verifyOtpModal: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15
  },
  verifyOtpModalTextInput: {
    height: 40,
    width: "80%"
  },
  verifyOtpDialogModal: {
    height: 200,
    width: SCREEN_W * 0.9
  },
  verifyOtpModalDialogText: {
    textAlign: "left",
    padding: 30,
    fontSize: FONT_XXL,
    fontWeight: FONT_WEIGHT_BOLD,
    color: SECONDARY,
    paddingTop: -30
  },
  verifyOtpInputText: {
    height: 50,
    textAlign: "center",
    fontSize: FONT_XL,
    fontFamily: "Courier"
  },
  verifyOtpItem: {
    borderBottomWidth: 0
  },
  verifyOtpText: {
    marginTop: 25,
    color: SECONDARY,
    fontSize: FONT_L
  },
  textInput: {
    padding: 0,
    margin: 0,
    flex: 1,
    fontSize: FONT_XL,
    color: SECONDARY_DARK
  },
  inputText: {
    height: 50,
    textAlign: "center",
    fontSize: 40,
    fontWeight: FONT_WEIGHT_BOLD,
    fontFamily: "Courier"
  }
});
