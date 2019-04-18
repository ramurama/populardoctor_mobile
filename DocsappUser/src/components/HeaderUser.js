import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Header, Left, Right, Body, Text } from 'native-base';
import commonStyles from '../commons/styles';
import PropTypes from 'prop-types';
import { PRIMARY } from '../config/colors';
import { FONT_L } from '../config/fontSize';
import { FONT_WEIGHT_MEDIUM } from '../config/fontWeight';
import StatusBar from '../components/StatusBar';

const propTypes = {
  title: PropTypes.string.isRequired
};

class HeaderUser extends React.Component {
  render() {
    let titleLeftPadding = {
      paddingLeft: 0
    };
    if (Platform.OS === 'android') {
      titleLeftPadding = {
        paddingLeft: 15
      };
    }
    return (
      <Header style={commonStyles.headerDefault}>
        <StatusBar />
        <Left />
        <Body style={[styles.bodyStyle, titleLeftPadding]}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.titleText}>
            {this.props.title}
          </Text>
        </Body>
        <Right />
      </Header>
    );
  }
}

export default HeaderUser;

const styles = StyleSheet.create({
  titleText: {
    color: PRIMARY,
    fontSize: FONT_L,
    fontWeight: FONT_WEIGHT_MEDIUM
  },
  bodyStyle: {
    flex: 3,
    paddingLeft: 20
  }
});
