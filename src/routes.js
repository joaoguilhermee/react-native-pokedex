import { createStackNavigator } from "react-navigation";

import Main from "./pages/main";
import Pokemon from "./pages/pokemon";

export default createStackNavigator(
  {
    Main,
    Pokemon
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: "transparent",
        borderBottomColor: "transparent"
      }
    }
  }
);
