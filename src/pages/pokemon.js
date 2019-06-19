import React from "react";

import { Text, WebView } from "react-native";

const Pokemon = ({ navigation }) => (
  <>
    <Text>{navigation.state.params.pokemon.name}</Text>
    <WebView source={{ uri: navigation.state.params.pokemon.url }} />
  </>
);

export default Pokemon;
