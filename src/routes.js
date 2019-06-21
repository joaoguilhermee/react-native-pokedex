import { createStackNavigator } from "react-navigation";

import Pokedex from "./pages/pokedex";
import Pokemon from "./pages/pokemon";

export default createStackNavigator(
  {
    Pokedex,
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
