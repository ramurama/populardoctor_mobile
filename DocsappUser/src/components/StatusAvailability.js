import React, { Component } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import { SECONDARY, WHITE, BLOCK_COLOR } from '../config/colors';
import { FONT_L, FONT_XXL, FONT_XXXL } from '../config/fontSize';

const propTypes = {
  hospital: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  onBlockPress: PropTypes.func
};

class StatusAvailability extends Component {
  _renderCardLayout(hospital, time, onBlockPress) {
    return (
      <View style={styles.cardStyle}>
        <View style={styles.row}>
          <View style={styles.columnView}>
            <View style={styles.iconTextContainer}>
              <Icon
                name='hospital'
                type='FontAwesome5'
                style={styles.generalIcon}
              />
              <Text
                style={styles.contentStyle}
                numberOfLines={3}
                ellipsizeMode='tail'
              >
                {hospital}
              </Text>
            </View>
            <View style={styles.iconTextContainer}>
              <Icon name='md-time' type='Ionicons' style={styles.generalIcon} />
              <Text
                style={styles.contentStyle}
                numberOfLines={2}
                ellipsizeMode='tail'
              >
                {time}
              </Text>
            </View>
          </View>
          <View style={styles.buttonLayoutStyle}>
            <TouchableOpacity
              style={styles.blockButtonStyle}
              onPress={onBlockPress}
            >
              <Icon
                name='block'
                type='MaterialIcons'
                style={styles.blockIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { hospital, time, onBlockPress } = this.props;
    return <View>{this._renderCardLayout(hospital, time, onBlockPress)}</View>;
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 0,
    backgroundColor: 'white',
    shadowColor: 'grey',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    // marginTop: 6,
    // marginBottom: 6,
    elevation: 4,
    alignItems: 'flex-start',
    borderRadius: 10,
    margin: 10,
    overflow: 'hidden'
  },
  contentStyle: {
    minHeight: 20,
    padding: 8
  },
  buttonLayoutStyle: {
    flex: 1,
    flexDirection: 'column'
  },
  blockButtonStyle: {
    flex: 1,
    backgroundColor: BLOCK_COLOR,
    justifyContent: 'center',
    alignItems: 'center'
  },
  blockTextStyle: {
    color: SECONDARY
  },
  generalIcon: {
    fontSize: FONT_XXL,
    color: SECONDARY
  },
  columnView: {
    flexDirection: 'column',
    flex: 4,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 8
  },
  row: {
    flexDirection: 'row'
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  blockIcon: {
    fontSize: FONT_XXXL,
    color: WHITE
  }
});

export default StatusAvailability;
