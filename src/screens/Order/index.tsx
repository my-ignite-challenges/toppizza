import React, { useState } from "react";

import { Platform } from "react-native";

import {
  Container,
  ContentScroll,
  Form,
  FormGroupRow,
  FormHeader,
  Header,
  Image,
  InputGroup,
  Label,
  Price,
  Sizes,
} from "./styles";
import { useNavigation } from "@react-navigation/native";

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { RadioButton } from "../../components/RadioButton";
import { PIZZA_SIZES } from "../../utils/pizzaTypes";

export function Order() {
  const [selectedSize, setSelectedSize] = useState("");

  const navigation = useNavigation();

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ContentScroll>
        <Header>
          <BackButton
            onPress={() => navigation.goBack()}
            style={{ marginBottom: 108 }}
          />
        </Header>
        <Image source={{ uri: "http://github.com/georgewfsantos.png" }} />

        <Form>
          <FormHeader>Nome da Pizza</FormHeader>
          <Sizes>
            {PIZZA_SIZES.map((size) => (
              <RadioButton
                title={size.label}
                selected={selectedSize === size.id}
                key={size.id}
                onPress={() => setSelectedSize(size.id)}
              />
            ))}
          </Sizes>

          <FormGroupRow>
            <InputGroup>
              <Label>Número da mesa</Label>
              <Input keyboardType="numeric" />
            </InputGroup>

            <InputGroup>
              <Label>Número da mesa</Label>
              <Input keyboardType="numeric" />
            </InputGroup>
          </FormGroupRow>

          <Price>Valor: R$ 00,00</Price>

          <Button title="Confirmar pedido" />
        </Form>
      </ContentScroll>
    </Container>
  );
}
