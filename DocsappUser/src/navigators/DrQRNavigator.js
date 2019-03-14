import { createAppContainer, createStackNavigator } from "react-navigation";
import { PRIMARY } from "../config/colors";
import commonStyles from "../commons/styles";
import { VIEW_DR_VISIT_CONFIRMATION } from "../constants/viewNames";
import VisitConfirmation from "../views/doctor/VisitConfirmation";
import VisitConfirmationDetail from "../views/doctor/VisitConfirmationDetail"
import { VISITOR_DETAILS } from "../constants/strings";

const DrQRNavigator = createStackNavigator(
  {
    drVisitConfirmation: {
      screen: VisitConfirmation,
      navigationOptions: {
        header: null,
        headerBackTitle: null
      }
    },
    drVisitConfirmationDetail: {
      screen: VisitConfirmationDetail, 
      navigationOptions: {
        title: VISITOR_DETAILS,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: PRIMARY,
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    }
  },
  {
    initialRouteName: VIEW_DR_VISIT_CONFIRMATION
  }
);

export default createAppContainer(DrQRNavigator);
