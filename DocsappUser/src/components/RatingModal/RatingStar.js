import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';

const star = 'star';
const starBorder = 'star-border';

const propTypes = {
  onStarPress: PropTypes.func.isRequired
};

class RatingStar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 5
    };
  }

  _starPressed(rating) {
    this.setState({ rating }, () => {
      this.props.onStarPress(rating);
    });
  }

  _renderStar(style, value) {
    return (
      <Icon
        name={style}
        type="MaterialIcons"
        style={{ color: 'red' }}
        onPress={() => this._starPressed(value)}
      />
    );
  }

  _renderStars() {}

  render() {
    const { rating } = this.state;
    if (rating === 5) {
      return (
        <View style={styles.starView}>
          {this._renderStar(star, 1)}
          {this._renderStar(star, 2)}
          {this._renderStar(star, 3)}
          {this._renderStar(star, 4)}
          {this._renderStar(star, 5)}
        </View>
      );
    } else if (rating === 4) {
      return (
        <View style={styles.starView}>
          {this._renderStar(star, 1)}
          {this._renderStar(star, 2)}
          {this._renderStar(star, 3)}
          {this._renderStar(star, 4)}
          {this._renderStar(starBorder, 5)}
        </View>
      );
    } else if (rating === 3) {
      return (
        <View style={styles.starView}>
          {this._renderStar(star, 1)}
          {this._renderStar(star, 2)}
          {this._renderStar(star, 3)}
          {this._renderStar(starBorder, 4)}
          {this._renderStar(starBorder, 5)}
        </View>
      );
    } else if (rating === 2) {
      return (
        <View style={styles.starView}>
          {this._renderStar(star, 1)}
          {this._renderStar(star, 2)}
          {this._renderStar(starBorder, 3)}
          {this._renderStar(starBorder, 4)}
          {this._renderStar(starBorder, 5)}
        </View>
      );
    } else {
      return (
        <View style={styles.starView}>
          {this._renderStar(star, 1)}
          {this._renderStar(starBorder, 2)}
          {this._renderStar(starBorder, 3)}
          {this._renderStar(starBorder, 4)}
          {this._renderStar(starBorder, 5)}
        </View>
      );
    }
  }
}

export default RatingStar;

const styles = StyleSheet.create({
  starView: {
    flexDirection: 'row',
  }
});
