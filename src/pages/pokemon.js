import React from "react";
import { Text } from "react-native";
import { WebView } from "react-native-webview";

const Pokemon = ({ navigation }) => (
  <>
    <Text>{navigation.state.params.pokemon.name}</Text>
    <WebView source={{ uri: navigation.state.params.pokemon.url }} />
  </>
);

export default Pokemon;
