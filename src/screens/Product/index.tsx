import React, { useState } from "react";
import { Platform } from "react-native";

import * as ImagePicker from "expo-image-picker";

import { TouchableOpacity } from "react-native-gesture-handler";
import { BackButton } from "../../components/BackButton";
import { Photo } from "../../components/Photo";
import { PriceInput } from "../../components/PriceInput";
import {
  Container,
  Header,
  Title,
  DeleteLabel,
  Upload,
  PickImageButton,
} from "./styles";

export function Product() {
  const [image, setImage] = useState("");

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
  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
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

      <PriceInput size="P" />
      <PriceInput size="M" />
      <PriceInput size="G" />
    </Container>
  );
}
