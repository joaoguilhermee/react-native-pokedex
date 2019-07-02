// import { colors, fonts, metrics, general } from "../../style";
import styled from "styled-components";
import { Dimensions } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const Container = styled.View`
  flex: 1;

  background: #e5e5e5;
  padding-top: ${getStatusBarHeight()}px;
`;
export const Title = styled.Text`
  color: #303943;
  font-family: "Poppins SemiBold";
  font-size: 30px;
  margin-left: 28px;
`;
// export const PokemonList = styled.FlatList`
//   /* flex-wrap: wrap; */
//   /* background: red;
//   width: 100%; */
// `;
export const PokemonList = styled.FlatList`
  padding: 0 18px 0 8px;
`;
export const Pokemon = styled.View`
  background: #ddd;
  margin-left: 10px;
  flex-basis: 45%;
  border-radius: 15px;
  /* box-shadow: 0px 8px 15px rgba(48, 57, 67, 0.12); */
  margin-bottom: 10px;
  padding: 10px;
  position: relative;
  overflow: hidden;
  min-height: 110px;
`;
export const Types = styled.View``;
export const Type = styled.View`
  background: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  height: 20px;
  padding: 0 10px;
  margin-bottom: 6px;
`;
export const TypeText = styled.Text`
  color: #fff;
  font-family: "Poppins ExtraLight";
  font-size: 10px;
  line-height: 20px;
  text-transform: capitalize;
  text-align: center;
`;
export const InfoImage = styled.View`
  justify-content: flex-end;
  flex-direction: row;
  align-content: flex-start;
`;

export const Name = styled.Text`
  color: #fff;
  font-family: "Poppins";
  font-size: 14px;
  line-height: 14px;
  text-transform: capitalize;
`;
export const Number = styled.Text`
  color: #303943;
  opacity: 0.5;
  font-family: "Poppins";
  font-size: 14px;
  line-height: 14px;
`;
export const NameNumber = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const PokemonImage = styled.View`
  flex: 1;
  align-items: flex-start;
  align-content: flex-end;
  margin-right: -10px;
  margin-bottom: -10px;
`;
