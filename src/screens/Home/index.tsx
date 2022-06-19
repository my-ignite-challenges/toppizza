import React, { useEffect } from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { Alert, TouchableOpacity } from "react-native";
import { useTheme } from "styled-components";
import firestore from "@react-native-firebase/firestore";

import happyEmoji from "../../assets/happy.png";
import { Search } from "../../components/Search";

import {
  Container,
  Header,
  Greeting,
  GreetingEmoji,
  GreetingWrapper,
  MenuHeader,
  Title,
  MenuItemsNumber,
} from "./styles";
import { ProductCard, ProductProps } from "../../components/ProductCard";

export function Home() {
  const { COLORS } = useTheme();

  function fetchProducts(value: string) {
    const formattedValue = value.toLowerCase().trim();

    firestore()
      .collection("pizzas")
      .orderBy("name_case_insensitive")
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then((response) => {
        const data = response.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];

        console.log(data);
      })
      .catch(() =>
        Alert.alert("Consulta", "Não foi possível realizar a consulta")
      );
  }

  useEffect(() => {
    fetchProducts("");
  }, []);

  return (
    <Container>
      <Header>
        <GreetingWrapper>
          <GreetingEmoji source={happyEmoji} />
          <Greeting>Olá, Admin</Greeting>
        </GreetingWrapper>

        <TouchableOpacity>
          <MaterialIcons name="logout" color={COLORS.TITLE} size={24} />
        </TouchableOpacity>
      </Header>

      <Search onSearch={() => {}} onClear={() => {}} />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>10 pizzas</MenuItemsNumber>
      </MenuHeader>
      <ProductCard
        data={{
          id: "1",
          name: "Pizza",
          description: "Imagine os ingredientes que quiser aqui",
          image_url: "https://github.com/georgewfsantos.png",
        }}
      />
    </Container>
  );
}
