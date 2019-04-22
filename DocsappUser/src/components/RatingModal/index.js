import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import {
  Text,
  Header,
  Left,
  Right,
  Body,
  Title,
  Icon,
  Input,
  Item,
  Footer,
  Content
} from 'native-base';
import {
  SECONDARY,
  BACKGROUND_DARK_GREY,
  SECONDARY_DARK,
  PRIMARY,
  WHITE
} from '../../config/colors';
import RatingStar from './RatingStar';
import { FONT_L } from '../../config/fontSize';
import { FONT_WEIGHT_BOLD } from '../../config/fontWeight';
import PropTypes from 'prop-types';

const IMG_ONE_STAR = require('./images/one_star_smile.png');
const IMG_TWO_STAR = require('./images/two_star_smile.png');
const IMG_THREE_STAR = require('./images/three_star_smile.png');
const IMG_FOUR_STAR = require('./images/four_star_smile.png');
const IMG_FIVE_STAR = require('./images/five_star_smile.png');

const propTypes = {
  visible: PropTypes.bool.isRequired,
  doctorName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

/**
 * usage 
 * 
 * 
 * <RatingModal
            doctorName="Santhoshsivan Balanagarajan"
            date={date}
            visible={this.state.ratingModalVisible}
            onSubmit={(rating, suggestions) => {
              //API call
              this.setState({ ratingModalVisible: false });
            }}
          />
 * 
 */
class RatingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 5,
      smileImage: IMG_FIVE_STAR,
      suggestions: ''
    };
  }

  _renderHeader() {
    const { rating, suggestions } = this.state;
    return (
      <Header>
        <Left>
          {/* <TouchableOpacity onPress={() => this.props.onClose()}>
            <Icon name="close" type="MaterialIcons" style={styles.closeIcon} />
          </TouchableOpacity> */}
        </Left>
        <Body>
          <Title style={styles.title}>Rate Us</Title>
        </Body>
        <Right />
      </Header>
    );
  }

  _renderDoctorView() {
    return (
      <View style={styles.doctorView}>
        <Text style={styles.appointmentText}>Your appointment with</Text>
        <Text style={styles.doctorName} numberOfLines={2}>
          {'Dr. ' + this.props.doctorName}
        </Text>
      </View>
    );
  }

  _renderDateView() {
    return (
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        <Text style={styles.appointmentText}>on </Text>
        <Text style={{ color: SECONDARY_DARK }}>{this.props.date}</Text>
      </View>
    );
  }

  _renderMessage() {
    return (
      <View style={styles.messageView}>
        <Text style={styles.messageText}>
          Your opinion is important to us. This way we can keep improving our
          service.
        </Text>
      </View>
    );
  }

  _renderRatingStarView() {
    return (
      <View style={styles.ratingStarView}>
        <Text style={styles.infoText}>Rate your experience</Text>
        <RatingStar
          onStarPress={rating => {
            let smileImage = IMG_FIVE_STAR;
            switch (rating) {
              case 1:
                smileImage = IMG_ONE_STAR;
                break;
              case 2:
                smileImage = IMG_TWO_STAR;
                break;
              case 3:
                smileImage = IMG_THREE_STAR;
                break;
              case 4:
                smileImage = IMG_FOUR_STAR;
                break;
              default:
                smileImage = IMG_FIVE_STAR;
            }
            this.setState({ rating, smileImage });
          }}
        />
      </View>
    );
  }

  _renderRatingView() {
    return (
      <View style={styles.ratingView}>
        {this._renderRatingStarView()}
        <View style={styles.smileImageView}>
          <Image source={this.state.smileImage} style={styles.smileImage} />
        </View>
      </View>
    );
  }

  _renderSuggestionsView() {
    return (
      <View style={styles.suggestionsView}>
        <Text style={styles.infoText}>
          Have any suggestions? Why don't you tell us?
        </Text>
        <Item style={styles.itemStyle}>
          <Input
            style={styles.inputStyle}
            onChangeText={value =>
              this.setState({
                suggestions: value.trim()
              })
            }
            multiline={true}
            placeholder="Please fill your answer..."
          />
        </Item>
      </View>
    );
  }

  _renderSubmitButton() {
    const { rating, suggestions } = this.state;
    return (
      <TouchableOpacity
        onPress={() => this.props.onSubmit(rating, suggestions)}
      >
        <Footer style={styles.footerButtonStyle}>
          <View style={styles.footerButtonView}>
            <Text style={styles.footerButtonText}>Submit</Text>
            <Icon name="send" type="MaterialIcons" style={styles.submitIcon} />
          </View>
        </Footer>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        animationType="slide"
        transparent={false}
      >
        {this._renderHeader()}
        <Content scrollEnabled={false}>
          <KeyboardAvoidingView
            behavior="padding"
            enabled
            style={styles.mainView}
          >
            {this._renderDoctorView()}
            {this._renderDateView()}
            {this._renderMessage()}
            {this._renderRatingView()}
            {this._renderSuggestionsView()}
          </KeyboardAvoidingView>
        </Content>
        {this._renderSubmitButton()}
      </Modal>
    );
  }
}

export default RatingModal;

const styles = StyleSheet.create({
  closeIcon: {
    color: BACKGROUND_DARK_GREY
  },
  title: {
    color: SECONDARY
  },
  mainView: {
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1
  },
  messageText: {
    color: BACKGROUND_DARK_GREY,
    textAlign: 'center'
  },
  messageView: {
    marginTop: 10,
    marginBottom: 10
  },
  infoText: {
    color: SECONDARY_DARK,
    margin: 5
  },
  ratingView: {
    flex: 1,
    flexDirection: 'row'
  },
  ratingStarView: {
    flexDirection: 'column',
    flex: 2,
    justifyContent: 'center'
  },
  suggestionsView: {
    flexDirection: 'column',
    marginTop: 15,
    flex: 4
  },
  smileImage: {
    height: 35,
    width: 35
  },
  smileImageView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  itemStyle: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 16,
    borderBottomWidth: 0,
    height: 150
  },
  inputStyle: {
    flex: 1,
    width: '100%',
    marginTop: 4,
    borderWidth: 2,
    borderColor: SECONDARY,
    borderRadius: 5
  },
  footerButtonStyle: {
    backgroundColor: SECONDARY
  },
  footerButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerButtonText: {
    fontSize: FONT_L,
    fontWeight: FONT_WEIGHT_BOLD,
    padding: 10,
    color: PRIMARY
  },
  submitIcon: {
    color: WHITE,
    fontSize: 25
  },
  doctorName: {
    color: SECONDARY_DARK,
    fontSize: 20,
    fontWeight: FONT_WEIGHT_BOLD,
    paddingBottom: 10
  },
  appointmentText: {
    alignSelf: 'center',
    color: BACKGROUND_DARK_GREY
  },
  doctorView: {
    alignSelf: 'center',
    marginTop: 10
  }
});
