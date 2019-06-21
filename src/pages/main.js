import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import PlaceholderImage from "../components/PlaceholderImage";
import api from "../services/api";

let placeholder = [
  { id: 1, loaded: false },
  { id: 2, loaded: false },
  { id: 3, loaded: false },
  { id: 4, loaded: false },
  { id: 5, loaded: false },
  { id: 6, loaded: false },
  { id: 7, loaded: false },
  { id: 8, loaded: false }
];
export default class Main extends Component {
  componentDidMount() {
    this.loadPokemons();
  }
  state = {
    pokemons: placeholder,
    page: 1,
    total: 0,
    visible: false
  };
  loadItem = pokemon => {
    try {
      console.log("BEFORE", pokemon);
      api
        .get(`/pokemon/${pokemon.id}`)
        .then(response => {
          const { data } = response;
          pokemon.data = data;
          pokemon.loaded = true;
          pokemon.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            pokemon.id
          }.png`;
        })
        .then(response => {
          api.get(`/pokemon-species/${pokemon.id}`).then(species => {
            species = species.data;
            pokemon.species = species;

            pokemon.color = species.color.name;
          });
        });

      console.log("AFTER", pokemon);
      return pokemon;
    } catch (error) {
      console.log(error);
    }
  };
  loadPokemons = async (page = 1) => {
    offset = 20 * (page - 1);

    await api.get(`/pokemon?offset=${offset}&limit=20`).then(response => {
      const { data } = response;
      const { results } = data;
      const total = data.count;
      let pokemons;

      results.map(item => (item.id = item.url.split("/").reverse()[1]));

      console.log("IDSzado", results);
      if (page == 1) {
        pokemons = results;
      } else {
        pokemons = [...this.state.pokemons, ...results];
      }

      this.setState({
        pokemons: pokemons,
        page,
        total
      });

      this.setState({ visible: true });
    });
  };
  loadMore = () => {
    const { page, total } = this.state;

    if (page == total) return;

    const pageNumber = page + 1;

    this.loadPokemons(pageNumber);
  };
  renderItem = ({ item }) => (
    <View>
      <View
        style={{
          marginVertical: 20,
          height: 300,
          backgroundColor: item.color
        }}
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
      viewableItems.find(({ item }) => item.id === pokemon.id)
        ? this.loadItem(pokemon)
        : pokemon
    );

    this.setState({ pokemons: newData });

    console.log("handleLazyLoad", this.state.pokemons);
  };
  render() {
    return (
      <View>
        <Text style={styles.instructions}>Pokemons</Text>
        <FlatList
          data={this.state.pokemons}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.1}
          onViewableItemsChanged={this.handleLazyLoad}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  instructions: {
    fontFamily: "Poppins",
    fontSize: 40,
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
