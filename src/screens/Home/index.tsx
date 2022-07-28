import React, { useCallback, useState } from "react";

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
  NewProductButton,
} from "./styles";
import { ProductCard, ProductProps } from "../../components/ProductCard";
import { FlatList } from "react-native-gesture-handler";
import { useAuth } from "../../hooks/auth";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export function Home() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [searchText, setSearchText] = useState("");

  const { signOut, user } = useAuth();

  const { COLORS } = useTheme();

  const navigation = useNavigation();

  function fetchProducts(searchText: string) {
    const formattedValue = searchText.toLowerCase().trim();

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

        setProducts(data);
      })
      .catch(() =>
        Alert.alert("Consulta", "Não foi possível realizar a consulta")
      );
  }

  function handleSearch() {
    fetchProducts(searchText);
  }

  function handleSearchTextClear() {
    setSearchText("");
    fetchProducts("");
  }

  function handleGoToProductDetails(id: string) {
    const renderProductOrOrderScreenRoute = user?.isAdmin ? "Product" : "Order";

    navigation.navigate(renderProductOrOrderScreenRoute, { id });
  }

  function handleNewProductCreation() {
    navigation.navigate("Product", {});
  }

  useFocusEffect(
    useCallback(() => {
      fetchProducts("");
    }, [])
  );

  return (
    <Container>
      <Header>
        <GreetingWrapper>
          <GreetingEmoji source={happyEmoji} />
          <Greeting>Olá, Admin</Greeting>
        </GreetingWrapper>

        <TouchableOpacity onPress={signOut}>
          <MaterialIcons name="logout" color={COLORS.TITLE} size={24} />
        </TouchableOpacity>
      </Header>

      <Search
        value={searchText}
        onChangeText={setSearchText}
        onSearch={handleSearch}
        onClear={handleSearchTextClear}
      />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>{products.length} pizzas</MenuItemsNumber>
      </MenuHeader>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            data={item}
            onPress={() => handleGoToProductDetails(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
      />
      {user?.isAdmin && (
        <NewProductButton
          title="Cadastrar Pizza"
          type="secondary"
          onPress={handleNewProductCreation}
        />
      )}
    </Container>
  );
}
