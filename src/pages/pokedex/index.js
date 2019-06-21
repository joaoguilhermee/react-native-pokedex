import React, { Component } from "react";
import { TouchableOpacity, Image, SafeAreaView } from "react-native";
// import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import PlaceholderImage from "../../components/PlaceholderImage";
import api from "../../services/api";
import {
  Title,
  Container,
  Pokemon,
  PokemonList,
  Name,
  InfoImage,
  Types,
  Type,
  TypeText,
  NameNumber,
  Number,
  PokemonImage
} from "./styles";
// let placeholder = [
//   { id: 1, loaded: false, color: "#CCC" },
//   { id: 2, loaded: false, color: "#CCC" },
//   { id: 3, loaded: false, color: "#CCC" },
//   { id: 4, loaded: false, color: "#CCC" },
//   { id: 5, loaded: false, color: "#CCC" },
//   { id: 6, loaded: false, color: "#CCC" },
//   { id: 7, loaded: false, color: "#CCC" },
//   { id: 8, loaded: false, color: "#CCC" }
// ];
export default class Pokedex extends Component {
  componentDidMount() {
    this.loadPokemons();

    let colors = [];
    colors["red"] = "#FB6C6C";
    colors["green"] = "#48D0B0";
    colors["blue"] = "#77BDFE";
    colors["yellow"] = "#FFCE4B";
    colors["brown"] = "#B1736C";
    colors["purple"] = "#7C538C";
    colors["black"] = "#333";
    colors["pink"] = "pink";
    colors["gray"] = "#aaa";
    colors["white"] = "#ccc";

    this.setState({
      colors
    });
  }
  constructor(props) {
    super(props);

    this.viewabilityConfig = {
      // waitForInteraction: true,
      itemVisiblePercentThreshold: 100
    };
  }
  state = {
    colors: [],
    pokemons: [],
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

            console.log("COLORs", this.state.colors);
            pokemon.color = this.state.colors[species.color.name];
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

      console.log("COLOR", this.state.colors);
    });
  };
  loadMore = () => {
    const { page, total } = this.state;

    if (page == total) return;

    const pageNumber = page + 1;

    this.loadPokemons(pageNumber);
  };
  renderItem = ({ item }) => (
    <Pokemon style={{ backgroundColor: item.color }}>
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("Pokemon", { pokemon: item });
        }}
      >
        <NameNumber>
          {/* <ShimmerPlaceHolder
            style={{ alignSelf: "stretch", marginBottom: 10 }}
            autoRun={true}
            visible={this.state.visible}
          > */}
          <Name>{item.name}</Name>
          {/* </ShimmerPlaceHolder> */}
          {/* <ShimmerPlaceHolder
            style={{ alignSelf: "stretch", marginBottom: 10 }}
            autoRun={true}
            visible={this.state.visible}
          > */}
          <Number>#{("0000" + item.id).toString().slice(-3)}</Number>
          {/* </ShimmerPlaceHolder> */}
        </NameNumber>
        <InfoImage>
          <Types>
            {item.data &&
              item.data.types &&
              item.data.types.map(tipo => (
                <Type>
                  <TypeText>{tipo.type.name}</TypeText>
                </Type>
              ))}
          </Types>
          {item.loaded && (
            <PokemonImage>
              <PlaceholderImage
                style={{
                  width: 100,
                  height: 100,
                  alignItems: "flex-end"
                }}
                source={{ uri: item.image }}
              />
            </PokemonImage>
          )}
        </InfoImage>
        <Image
          style={{
            width: 83,
            height: 83,
            position: "absolute",
            bottom: -15,
            right: -15
          }}
          source={require("../../../assets/images/bg-pokeball.png")}
        />
      </TouchableOpacity>
    </Pokemon>
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
      <Container>
        <Image
          style={{
            width: 200,
            height: 200,
            position: "absolute",
            top: -100,
            right: -0
          }}
          source={require("../../../assets/images/bg-pokeball.png")}
        />
        <Title>Pokedex</Title>

        <SafeAreaView>
          <PokemonList
            data={this.state.pokemons}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.1}
            onViewableItemsChanged={this.handleLazyLoad}
            viewabilityConfig={this.viewabilityConfig}
            numColumns={2}
          />
        </SafeAreaView>
      </Container>
    );
  }
}
