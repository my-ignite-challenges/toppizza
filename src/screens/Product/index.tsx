import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  View,
  Button as ReactButton,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { useNavigation, useRoute } from "@react-navigation/native";

import { TouchableOpacity } from "react-native-gesture-handler";
import { BackButton } from "../../components/BackButton";
import { Input } from "../../components/Input";
import { Photo } from "../../components/Photo";
import { PriceInput } from "../../components/PriceInput";

import {
  Container,
  Header,
  Title,
  DeleteLabel,
  Upload,
  PickImageButton,
  Form,
  InputGroup,
  MaxCharacters,
  Label,
  InputGroupHeader,
} from "./styles";
import { ProductRouteNavigationProps } from "../../@types/navigation";
import { Button } from "../../components/Button";
import { ProductProps } from "../../components/ProductCard";

type ProductResponse = ProductProps & {
  image_path: string;
  size_prices: {
    p: string;
    m: string;
    g: string;
  };
};

export function Product() {
  const [image, setImage] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [smallSizePrice, setSmallSizePrice] = useState("");
  const [mediumSizePrice, setMediumSizePrice] = useState("");
  const [bigSizePrice, setBigSizePrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();

  const { id } = route.params as ProductRouteNavigationProps;

  async function handleImagePick() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 4],
      });

      // for some reason if you do !result.cancelled, VScode throws a typescript error
      if (result.cancelled === false) {
        setImage(result.uri);
      }
    }
  }

  async function handleProductCreation() {
    if (!name.trim()) {
      return Alert.alert("Cadastro de Produto", "Informe o nome do Pizza");
    }

    if (!description.trim()) {
      return Alert.alert("Cadastro de Produto", "Informe a descrição da Pizza");
    }

    if (!image) {
      return Alert.alert("Cadastro de Produto", "Selecione a imagem da Pizza");
    }

    if (!smallSizePrice || !mediumSizePrice || !bigSizePrice) {
      return Alert.alert(
        "Cadastro de Produto",
        "Informe o preço de todos os tamanhos da pizza"
      );
    }

    setIsLoading(true);

    const fileName = new Date().getTime();
    const reference = storage().ref(`/pizzas/${fileName}.png`);

    await reference.putFile(image);
    const image_url = await reference.getDownloadURL();

    firestore()
      .collection("pizzas")
      .add({
        name,
        name_case_insensitive: name.toLowerCase().trim(),
        description,
        size_prices: {
          p: smallSizePrice,
          m: mediumSizePrice,
          g: bigSizePrice,
        },
        image_url,
        image_path: reference.fullPath,
      })
      .then(() => navigation.navigate("Home"))
      .catch(() => {
        setIsLoading(false);
        Alert.alert("Cadastro", "Não foi possível cadastrar a pizza");
      });
  }

  function handleDelete() {
    firestore()
      .collection("pizzas")
      .doc(id)
      .delete()
      .then((response) => {
        storage()
          .ref(imagePath)
          .delete()
          .then(() => navigation.navigate("Home"));
      });
  }

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    if (id) {
      firestore()
        .collection("pizzas")
        .doc(id)
        .get()
        .then((response) => {
          const product = response.data() as ProductResponse;

          setName(product.name);
          setImage(product.image_url);
          setDescription(product.description);
          setSmallSizePrice(product.size_prices.p);
          setMediumSizePrice(product.size_prices.m);
          setBigSizePrice(product.size_prices.p);
          setImagePath(product.image_path);
        });
    }
  }, []);

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <BackButton onPress={handleGoBack} />
          <Title>Cadastrar</Title>
          {id ? (
            <TouchableOpacity onPress={handleDelete}>
              <DeleteLabel>Deletar</DeleteLabel>
            </TouchableOpacity>
          ) : (
            <View style={{ width: 20 }} />
          )}
        </Header>

        <Upload>
          <Photo uri={image} />
          {!id && (
            <PickImageButton
              title="Carregar"
              type="secondary"
              onPress={handleImagePick}
            />
          )}
        </Upload>

        <Form>
          <InputGroup>
            <Label>Nome</Label>
            <Input value={name} onChangeText={setName} />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacters> 0 de 60 caracteres</MaxCharacters>
            </InputGroupHeader>
            <Input
              multiline
              maxLength={60}
              style={{ height: 80 }}
              value={description}
              onChangeText={setDescription}
            />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e preços</Label>

            <PriceInput
              size="P"
              value={smallSizePrice}
              onChangeText={setSmallSizePrice}
            />
            <PriceInput
              size="M"
              value={mediumSizePrice}
              onChangeText={setMediumSizePrice}
            />
            <PriceInput
              size="G"
              value={bigSizePrice}
              onChangeText={setBigSizePrice}
            />
          </InputGroup>

          {!id && (
            <Button
              title="Cadastrar Pizza"
              isLoading={isLoading}
              onPress={handleProductCreation}
            />
          )}
        </Form>
      </ScrollView>
    </Container>
  );
}
