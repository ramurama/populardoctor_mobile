import React, { Component } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { SECONDARY } from "../config/colors";

const propTypes = {
  content: PropTypes.string.isRequired,
  okText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
};

class ConfirmationCard extends Component {
  _renderCardLayout(content, okText, onOk, cancelText, onCancel) {
    return (
      <View style={styles.cardStyle}>
        <Text
          style={styles.contentStyle}
          numberOfLines={5}
          ellipsizeMode="tail"
        >
          {content}
        </Text>

        <View style={styles.buttonLayoutStyle}>
          <TouchableOpacity style={styles.okButtonStyle} onPress={onOk}>
            <Text style={styles.okTextStyle}>{okText}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButtonStyle} onPress={onCancel}>
            <Text style={styles.cancelTextStyle}>{cancelText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { content, okText, cancelText, onOk, onCancel } = this.props;
    return (
      <View>
        {this._renderCardLayout(content, okText, onOk, cancelText, onCancel)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    flex: 1,
    flexDirection: "column",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    margin: 10,
    marginTop: 6,
    marginBottom: 6,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  contentStyle: {
    minHeight: 50,
    alignSelf: "center",
    padding: 8
  },
  buttonLayoutStyle: {
    flexDirection: "row",
    height: 35
  },
  okButtonStyle: {
    flex: 1,
    backgroundColor: SECONDARY,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    borderRadius: 5
  },
  okTextStyle: {
    color: "white"
  },
  cancelButtonStyle: {
    flex: 1,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  cancelTextStyle: {
    color: "darkgrey"
  }
});

export default ConfirmationCard;
