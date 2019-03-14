import { createAppContainer, createStackNavigator } from "react-navigation";
import { PRIMARY } from "../config/colors";
import commonStyles from "../commons/styles";
import VisitConfirmation from "../views/frontdesk/VisitConfirmation";
import VisitConfirmationDetail from "../views/frontdesk/VisitConfirmationDetail";
import { VISITOR_DETAILS } from "../constants/strings";
import { VIEW_FD_VISIT_CONFIRMATION } from "../constants/viewNames";

const FdQRNavigator = createStackNavigator(
  {
    fdVisitConfirmation: {
      screen: VisitConfirmation,
      navigationOptions: {
        header: null,
        headerBackTitle: null
      }
    },
    fdVisitConfirmationDetail: {
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
    initialRouteName: VIEW_FD_VISIT_CONFIRMATION
  }
);

export default createAppContainer(FdQRNavigator);
