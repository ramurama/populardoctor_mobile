import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  ListItem,
  Right,
  Text
} from "native-base";
import React from "react";
import {
  BackHandler,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { Col, Grid } from "react-native-easy-grid";
import Spinner from "react-native-loading-spinner-overlay";
import ModalWrapper from "react-native-modal-wrapper";
import { connect } from "react-redux";
import commonStyles from "../commons/styles";
import Specialization from "../components/Specialization";
import StatusBar from "../components/StatusBar";
import {
  BACKGROUND_2,
  DEFAULT_BORDER_COLOR,
  HELPER_TEXT_COLOR,
  ON_PRIMARY,
  ON_SECONDARY,
  PRIMARY,
  SECONDARY,
  WHITE
} from "../config/colors";
import { FONT_L, FONT_XS, FONT_XXXL } from "../config/fontSize";
import {
  FONT_WEIGHT_BOLD,
  FONT_WEIGHT_XBOLD,
  FONT_WEIGHT_XXBOLD
} from "../config/fontWeight";
import { icons } from "../constants/icons";
import {
  VIEW_MENU,
  VIEW_SEARCH_DOCTOR,
  VIEW_LOCATION
} from "../constants/viewNames";
import APIService from "../services/APIService";
import * as Actions from "../actions";

//the keys must be specified in API (DB)
const specializationImages = {
  dental: require("./images/dental.png"),
  cardio: require("./images/cardio.png"),
  optical: require("./images/optical.png"),
  ortho: require("./images/ortho.png"),
  general: require("./images/general.png"),
  gynaecology: require("./images/gynaecology.png"),
  ent: require("./images/ent.png"),
  endocrine: require("./images/endocrine.png"),
  neuro: require("./images/neuro.png"),
  pediatrics: require("./images/pediatrics.png")
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      locationCoords: null,
      locations: [],
      specializations: []
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    // this._getGeoLocation(locationCoords => this.setState({ locationCoords }));
    this.setState({ spinner: true }, () => {
      APIService.getInitialData(this.props.token, data => {
        const { locations, specializations, favorites, support } = data;
        this.setState(
          {
            locations,
            specializations,
            spinner: false
          },
          () => {
            this.props.setFavorites(favorites);
            this.props.setUserSupport(support);
            this.props.setLocation(this.state.locations[0].name);
          }
        );
      });
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    console.log("Back button is pressed");
    return true;
  };

  _getGeoLocation(callback) {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        callback(position.coords);
      },
      err => {
        console.log(err);
        callback(null);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  _renderHeaderLocationView() {
    return (
      <View style={styles.locationView}>
        <Icon
          name={icons.location}
          style={[styles.headerIcon]}
          type="MaterialIcons"
        />
        <Text style={styles.locationNameText}>{this.props.location}</Text>
      </View>
    );
  }

  _renderHeaderMenuView() {
    return (
      <View style={styles.menuView}>
        <Icon name={icons.menu2} style={styles.headerIcon} type="AntDesign" />
      </View>
    );
  }

  _renderHeader() {
    return (
      <Header style={[commonStyles.headerDefault]}>
        <StatusBar />
        <Body style={commonStyles.shadow}>
          <Grid>
            <Col size={60} style={styles.locationViewCol}>
              <View style={{ width: "100%" }}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate(VIEW_LOCATION, {
                      locations: this.state.locations
                    })
                  }
                >
                  {this._renderHeaderLocationView()}
                </TouchableOpacity>
              </View>
            </Col>
            <Col size={40} style={styles.menuViewCol}>
              <View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate(VIEW_MENU)}
                >
                  {this._renderHeaderMenuView()}
                </TouchableOpacity>
              </View>
            </Col>
          </Grid>
        </Body>
      </Header>
    );
  }

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} textStyle={{ color: WHITE }} />
    );
  }

  // _handleFindMyLocation = () => {
  //   //close modal on click detect button is temproary
  //   // modal has to be closed only after getting the location from google api
  //   this._getGeoLocation(locationCoords =>
  //     this.setState({ locationCoords, isLocationModalOpen: false })
  //   );
  // };

  _renderSpecialisationListItem(item) {
    return (
      <Specialization
        image={specializationImages[item.iconName]}
        specializationName={item.name}
        onPress={() => {
          //set search criteria to redux state
          this.props.setSearchCriteria({
            location: this.props.location,
            specialization: item.name
          });
          this.props.navigation.navigate(VIEW_SEARCH_DOCTOR, {
            title: item.name
          });
        }}
      />
    );
  }

  _renderSpecialisationList() {
    return (
      <FlatList
        data={this.state.specializations}
        renderItem={({ item }) => this._renderSpecialisationListItem(item)}
        numColumns="3"
      />
    );
  }

  render() {
    return (
      <Container>
        {this._renderHeader()}
        <Content style={styles.contentBackground} padder>
          {this._renderSpecialisationList()}
          {this._renderSpinner()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  location: state.location
});

export default connect(
  mapStateToProps,
  Actions
)(Search);

const styles = StyleSheet.create({
  headerIcon: {
    color: PRIMARY,
    fontSize: FONT_XXXL
  },
  headerLocationText: {
    color: PRIMARY,
    marginTop: 3,
    flex: 1,
    flexWrap: "wrap",
    fontSize: FONT_XS
  },
  locationNameText: {
    fontWeight: FONT_WEIGHT_XXBOLD,
    color: PRIMARY
  },
  locationView: {
    flexDirection: "row",
    alignItems: "center"
  },
  locationViewCol: {
    justifyContent: "center",
    alignItems: "flex-start"
  },
  menuView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  menuViewCol: {
    justifyContent: "center",
    alignItems: "flex-end"
  },
  locationModalContainer: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  locationModalView: {
    height: 330,
    padding: 10
  },
  modalBtnView: {
    padding: 10
  },
  modalBtnText: {
    color: PRIMARY,
    fontSize: FONT_L,
    fontWeight: FONT_WEIGHT_XBOLD
  },
  modalBtn: {
    color: PRIMARY,
    fontSize: FONT_L,
    fontWeight: FONT_WEIGHT_BOLD,
    backgroundColor: SECONDARY,
    width: "100%",
    borderRadius: 5
  },
  modalWrapper: {
    flex: 1
  },
  modalHeaderLeft: {
    paddingBottom: 10
  },
  modalHeaderBody: {
    flex: 3,
    paddingBottom: 6
  },
  orText: {
    fontWeight: "800",
    textAlign: "center",
    color: HELPER_TEXT_COLOR
  },
  locationSeletText: {
    textAlign: "center",
    fontSize: FONT_L,
    fontWeight: FONT_WEIGHT_XXBOLD,
    color: ON_PRIMARY,
    paddingLeft: 10,
    paddingBottom: 5
  },
  locationListView: {
    height: 210,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: DEFAULT_BORDER_COLOR
  },
  contentBackground: {
    backgroundColor: BACKGROUND_2
  },
  modalHeader: {
    flexDirection: "row",
    paddingTop: 10,
    backgroundColor: PRIMARY
  },
  closeIcon: { color: ON_SECONDARY }
});
