import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import PlaceholderImage from "../components/PlaceholderImage";
import api from "../services/api";

let placeholder = [
  { name: 1, loaded: false },
  { name: 2, loaded: false },
  { name: 3, loaded: false },
  { name: 4, loaded: false },
  { name: 5, loaded: false },
  { name: 6, loaded: false },
  { name: 7, loaded: false },
  { name: 8, loaded: false }
];
export default class Main extends Component {
  componentDidMount() {
    setTimeout(() => this.loadPokemons(), 2500);
  }
  state = {
    pokemons: placeholder,
    page: 1,
    total: 0,
    visible: false
  };
  loadPokemons = async (page = 1) => {
    offset = 20 * (page - 1);

    const response = await api.get(`/pokemon?offset=${offset}&limit=20`);

    const { data } = response;
    const { results } = data;
    const total = data.count;
    let pokemons;

    results.map(
      item => (
        (item.loaded = false), (item.image = "https://unsplash.it/1000/1000")
      )
    );

    if (page == 1) {
      pokemons = results;
    } else {
      pokemons = [...this.state.pokemons, ...results];
    }

    console.log("RESULTADO", this.state.pokemons);

    this.setState({
      pokemons: pokemons,
      page,
      total
    });
    setTimeout(() => this.setState({ visible: true }), 1000);
  };
  loadMore = () => {
    const { page, total } = this.state;

    if (page == total) return;

    const pageNumber = page + 1;

    this.loadPokemons(pageNumber);
  };
  renderItem = ({ item }) => (
    <View key={item.name}>
      <View>
        <View
          style={{ marginVertical: 20, height: 300, backgroundColor: "#EEE" }}
        >
          {item.loaded && (
            <PlaceholderImage
              style={{ width: 300, height: 300, borderRadius: 32 }}
              source={{ uri: item.image }}
            />
          )}
        </View>
        <ShimmerPlaceHolder
          style={{ alignSelf: "stretch", marginBottom: 10 }}
          autoRun={true}
          visible={this.state.visible}
        >
          <Text>{item.name}</Text>
        </ShimmerPlaceHolder>
      </View>

      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("Pokemon", { pokemon: item });
        }}
      >
        <Text>Acessar</Text>
      </TouchableOpacity>
    </View>
  );
  handleLazyLoad = ({ viewableItems }) => {
    console.log("viewableItems", viewableItems);
    const newData = this.state.pokemons.map(pokemon =>
      viewableItems.find(({ item }) => item.name === pokemon.name)
        ? { ...pokemon, loaded: true }
        : pokemon
    );

    this.setState({ pokemons: newData });

    console.log("handleLazyLoad", this.state.pokemons);
  };
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
          onViewableItemsChanged={this.handleLazyLoad}
        />
      </View>
    );
  }
}
