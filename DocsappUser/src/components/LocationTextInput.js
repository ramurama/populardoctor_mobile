import React from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Icon, Text } from "native-base";
import PropTypes from "prop-types";
import { DISABLED_GREY, BACKGROUND_DARK_GREY } from "../config/colors";

const propTypes = {
  onChangeText: PropTypes.func
};

class LocationTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.iconView}>
          <Icon name="location" type="EvilIcons" style={styles.iconStyle} />
        </View>
        <View style={styles.locationTextView}>
          <TextInput
            autoCapitalize="words"
            value={this.state.value}
            placeholder="Search..."
            onChangeText={value => {
              this.setState({ value }, () => this.props.onChangeText(value));
            }}
          />
        </View>
        <View style={{ justifyContent: "center" }}>
          {this.state.value !== "" && (
            <TouchableOpacity
              onPress={() => {
                this.setState({ value: "" }, () => this.props.onChangeText(""));
              }}
            >
              <View style={styles.clearIconView}>
                <Icon
                  name="clear"
                  type="MaterialIcons"
                  style={styles.clearIcon}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

export default LocationTextInput;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    padding: 20
  },
  iconView: { flex: 1 },
  locationTextView: {
    flex: 4,
    justifyContent: "center"
  },
  clearIconView: {
    backgroundColor: DISABLED_GREY,
    borderRadius: 25,
    padding: 1
  },
  clearIcon: {
    color: "white",
    fontSize: 16
  },
  iconStyle: {
    color: BACKGROUND_DARK_GREY
  }
});
