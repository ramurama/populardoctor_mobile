import React from "react";
import { View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Container, Content, Text, Footer } from "native-base";
import commonStyles from "../commons/styles";
import { connect } from "react-redux";
import { HELPER_TEXT_COLOR } from "../config/colors";
import { FONT_M, FONT_L } from "../config/fontSize";

class CustomerSupport extends React.Component {
  _renderCallButton() {
    return (
      <TouchableOpacity onPress={this._handleCallNow}>
        <Footer style={commonStyles.footerButtonStyle}>
          <View style={commonStyles.footerButtonView}>
            <Text style={commonStyles.footerButtonText}>Call</Text>
          </View>
        </Footer>
      </TouchableOpacity>
    );
  }

  _handleCallNow = () => {
    const { contact_number } = this.props.userSupport;
    Linking.openURL(`tel:${contact_number}`);
  };

  render() {
    return (
      <Container>
        <Content>
          <View style={styles.mainTextView}>
            <Text style={styles.mainText}>
              Click call to call our customer support executive.
            </Text>
          </View>
        </Content>
        {this._renderCallButton()}
      </Container>
    );
  }
}

const mapStateToProps = state => ({ userSupport: state.userSupport });

export default connect(mapStateToProps)(CustomerSupport);

const styles = StyleSheet.create({
  mainText: {
    alignSelf: "center",
    color: HELPER_TEXT_COLOR,
    fontSize: FONT_M
  },
  mainTextView: { flex: 1, marginTop: 30, flexDirection: "column" }
});
