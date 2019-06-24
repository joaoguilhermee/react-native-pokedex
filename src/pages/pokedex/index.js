import React, { Component, useState, useEffect } from "react";
import { TouchableOpacity, Image, SafeAreaView } from "react-native";
import PlaceholderImage from "../../components/PlaceholderImage";
import api from "../../services/api";
import axios from "axios";
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

export default function Pokedex() {
  let colors = [];
  colors["red"] = "#FB6C6C";
  colors["green"] = "#48D0B0";
  colors["blue"] = "#77BDFE";
  colors["yellow"] = "#FFCE4B";
  colors["brown"] = "#B1736C";
  colors["purple"] = "#7C538C";
  colors["black"] = "#333";
  colors["pink"] = "#ffc0cb";
  colors["gray"] = "#aaa";
  colors["white"] = "#ccc";

  const [pokemons, setPokemons] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  function viewPokemon(item) {
    // navigation.navigate("Pokemon", { pokemon: item });
  }

  useEffect(() => {
    fetchPokemons();
  }, []);

  function fetchData(pokemon) {
    pokemon.id = pokemon.url.split("/").reverse()[1];
    pokemon.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      pokemon.id
    }.png`;
    axios
      .all([
        api.get(`/pokemon/${pokemon.id}`),
        api.get(`/pokemon-species/${pokemon.id}`)
      ])
      .then(
        axios.spread(function(dataResponse, speciesResponse) {
          species = speciesResponse.data;

          pokemon.data = dataResponse.data;
          pokemon.species = species;
          pokemon.color = colors[species.color.name];
          pokemon.new = false;
          return pokemon;
        })
      );
    return pokemon;
  }
  async function fetchPokemons(page = 1) {
    let offset;
    let total;
    offset = 20 * (page - 1);
    let itens = await api
      .get(`/pokemon?offset=${offset}&limit=20`)
      .then(response => {
        const { data } = response;
        let { results } = data;
        results = results.map(pokemon => {
          return fetchData(pokemon);
        });
        total = data.count;

        setTotal(total);
        setPage(page);

        return results;
      });
    let list = [];
    if (page == 1) {
      list = itens;
    } else {
      list = [...pokemons, ...itens];
    }
    setPokemons(list);
  }
  function loadMore() {
    if (page == total) return;

    const pageNumber = page + 1;

    fetchPokemons(pageNumber);
  }
  function renderItem(pokemon) {
    return (
      <Pokemon style={{ backgroundColor: pokemon.item.color }}>
        <TouchableOpacity
          onPress={() => {
            viewPokemon(pokemon.item);
          }}
        >
          <NameNumber>
            <Name>{pokemon.item.name}</Name>
            <Number>#{("0000" + pokemon.item.id).toString().slice(-3)}</Number>
          </NameNumber>
          <InfoImage>
            <Types>
              {pokemon.item.data &&
                pokemon.item.data.types &&
                pokemon.item.data.types.map(tipo => (
                  <Type>
                    <TypeText>{tipo.type.name}</TypeText>
                  </Type>
                ))}
            </Types>
            <PokemonImage>
              <PlaceholderImage
                style={{
                  width: 100,
                  height: 100,
                  alignItems: "flex-start"
                }}
                source={{ uri: pokemon.item.image }}
              />
            </PokemonImage>
          </InfoImage>
          <Image
            style={{
              width: 83,
              height: 83,
              position: "absolute",
              bottom: -15,
              right: -15,
              zIndex: -1
            }}
            source={require("../../../assets/images/bg-pokeball-white.png")}
          />
        </TouchableOpacity>
      </Pokemon>
    );
  }

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
          data={pokemons}
          keyExtractor={item => item.name + item.id.toString()}
          renderItem={renderItem}
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          numColumns={2}
        />
      </SafeAreaView>
    </Container>
  );
}
