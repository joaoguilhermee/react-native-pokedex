import { createAppContainer, createSwitchNavigator } from "react-navigation";

// import { createAppContainer,createSwitchNavigator } from 'react-navigation';

import Pokedex from "./pages/pokedex";
import Pokemon from "./pages/pokemon";

const Routes = createSwitchNavigator({ Pokedex, Pokemon });

export default Routes;
