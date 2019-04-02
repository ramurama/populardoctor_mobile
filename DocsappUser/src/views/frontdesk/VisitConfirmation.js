import React from "react";
import { View, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { Container, Content, Text } from "native-base";
import Header from "../../components/HeaderDoctor";
import Footer from "../../components/FooterFrontDesk";
import commonStyles from "../../commons/styles";
import { DR_VISIT_CONFIRMATION } from "../../constants/strings";
import QRCodeScanner from "react-native-qrcode-scanner";
import { VIEW_FD_VISIT_CONFIRMATION_DETAIL } from "../../constants/viewNames";
import { FONT_L } from "../../config/fontSize";
import { FONT_WEIGHT_MEDIUM } from "../../config/fontWeight";

class VisitConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingId: ""
    };
  }

  _onQRRead = event => {
    console.log(event);
    this.setState({ isScanComplete: true }, () =>
      this.props.navigation.navigate(VIEW_FD_VISIT_CONFIRMATION_DETAIL, {
        bookingId: event.data
      })
    );
  };

  _renderQRCodeScanner() {
    return (
      <QRCodeScanner
        onRead={this._onQRRead}
        reactivate={true}
        cameraProps={{ captureAudio: false }}
        topContent={
          <Text style={styles.centerText}>
            Verify booking ID by scanning the QR code.
          </Text>
        }
      />
    );
  }

  render() {
    return (
      <Container>
        <Header title={DR_VISIT_CONFIRMATION} {...this.props} />
        <Content scrollEnabled={false} style={commonStyles.contentBg}>
          {this._renderQRCodeScanner()}
        </Content>
        <Footer {...this.props} activeButton={DR_VISIT_CONFIRMATION} />
      </Container>
    );
  }
}

export default VisitConfirmation;

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: FONT_L,
    padding: 32,
    color: "#777",
    marginBottom: 10
  },
  textBold: {
    fontWeight: FONT_WEIGHT_MEDIUM,
    color: "#000"
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)"
  },
  buttonTouchable: {
    padding: 16
  }
});
