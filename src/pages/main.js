import React, { Component } from "react";
import { Text, View } from "react-native";
import api from "../services/api";
export default class Main extends Component {
  componentDidMount() {
    this.loadPokemons();
  }
  state = {
    pokemons: []
  };
  loadPokemons = async () => {
    const response = await api.get("/pokemon");

    const { data } = response;
    const { results } = data;
    console.log("Pokemon", results);

    this.setState({ pokemons: results });
  };
  render() {
    return (
      <View>
        <Text>Pokenons</Text>
        {this.state.pokemons.map(pokemon => (
          <Text key={pokemon.name}>{pokemon.name}</Text>
        ))}
      </View>
    );
  }
}
