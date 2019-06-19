import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import api from "../services/api";
export default class Main extends Component {
  componentDidMount() {
    this.loadPokemons();
  }

  state = {
    pokemons: [],
    page: 1,
    total: 0
  };
  loadPokemons = async (page = 1) => {
    offset = 20 * (page - 1);
    const response = await api.get(`/pokemon?offset=${offset}&limit=20`);

    const { data } = response;
    const { results } = data;
    const total = data.count;
    console.log("API", response);

    this.setState({
      pokemons: [...this.state.pokemons, ...results],
      page,
      total
    });
  };
  loadMore = () => {
    const { page, total } = this.state;

    if (page == total) return;

    const pageNumber = page + 1;

    this.loadPokemons(pageNumber);
  };
  renderItem = ({ item }) => (
    <View key={item.name}>
      <Text>{item.name}</Text>
      <Text>{item.url}</Text>

      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("Pokemon", { pokemon: item });
        }}
      >
        <Text>Acessar</Text>
      </TouchableOpacity>
    </View>
  );
  render() {
    return (
      <View>
        <Text>Pokemons</Text>
        <FlatList
          data={this.state.pokemons}
          keyExtractor={item => item.name}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.1}
        />
      </View>
    );
  }
}
