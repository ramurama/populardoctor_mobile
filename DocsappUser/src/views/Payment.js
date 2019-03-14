import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Container, Content, Text, Footer } from "native-base";
import { connect } from "react-redux";
import * as Actions from "../actions";
import { SECONDARY, PRIMARY } from "../config/colors";
import { FONT_L } from "../config/fontSize";
import { FONT_WEIGHT_BOLD } from "../config/fontWeight";

class Payment extends React.Component {
  _renderFooterPayButton() {
    return (
      <TouchableOpacity onPress={this._handleConfirmButton}>
        <Footer style={styles.footerStyle}>
          <View style={styles.bookView}>
            <Text style={styles.bookText}>Pay</Text>
          </View>
        </Footer>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Container>
        <Content>
          <View />
        </Content>
        {this._renderFooterPayButton()}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  bookingData: state.bookingData
});

export default connect(
  mapStateToProps,
  Actions
)(Payment);

const styles = StyleSheet.create({
  footerStyle: {
    backgroundColor: SECONDARY
  },
  bookView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  bookText: {
    fontSize: FONT_L,
    fontWeight: FONT_WEIGHT_BOLD,
    padding: 10,
    color: PRIMARY
  }
});
