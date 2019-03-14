import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Container, Content, Text, Footer } from "native-base";
import commonStyles from "../../commons/styles";
import { SECONDARY, PRIMARY } from "../../config/colors";
import DoctorBooking from "../../components/DoctorBooking";
import VisitConfirmedIcon from "../../components/VisitConfirmedIcon";
import { FONT_L } from "../../config/fontSize";
import { FONT_WEIGHT_BOLD } from "../../config/fontWeight";

class VisitConfirmationDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConfirmed: false
    };
  }

  _handleConfirmButton = () => {
    this.setState({ isConfirmed: true });
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
    return (
      <Container>
        <Content style={commonStyles.contentBg}>
          <View style={{ flex: 1 }}>
            <DoctorBooking
              bookingDate="Feb 17, 2019"
              bookingId={this.props.navigation.getParam("bookingId")}
              tokenNumber="2"
              tokenTime="10:00 AM - 11:00 AM"
              visitorName="Ramu Ramasamy"
              visitorMobile="9894130821"
            />
          </View>
          {this.state.isConfirmed && <VisitConfirmedIcon />}
        </Content>
        {!this.state.isConfirmed && this._renderConfirmButton()}
      </Container>
    );
  }
}

export default VisitConfirmationDetail;

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
