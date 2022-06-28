import React, { useState } from "react";
import { Alert, Platform, ScrollView } from "react-native";

import * as ImagePicker from "expo-image-picker";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { useRoute } from "@react-navigation/native";

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
import { Button } from "../../components/Button";
import { ProductRouteNavigationProps } from "../../@types/navigation";

export function Product() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [smallSizePrice, setSmallSizePrice] = useState("");
  const [mediumSizePrice, setMediumSizePrice] = useState("");
  const [bigSizePrice, setBigSizePrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();

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
      .then(() =>
        Alert.alert("Cadastro de Produto", "Pizza cadastrada com sucesso")
      )
      .catch(() =>
        Alert.alert("Cadastro", "Não foi possível cadastrar a pizza")
      );

    setIsLoading(false);
  }

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <BackButton />
          <Title>Cadastrar</Title>
          <TouchableOpacity>
            <DeleteLabel>Deletar</DeleteLabel>
          </TouchableOpacity>
        </Header>

        <Upload>
          <Photo uri={image} />
          <PickImageButton
            title="Carregar"
            type="secondary"
            onPress={handleImagePick}
          />
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

          <Button
            title="Cadastrar pizza"
            isLoading={isLoading}
            onPress={handleProductCreation}
          />
        </Form>
      </ScrollView>
    </Container>
  );
}
