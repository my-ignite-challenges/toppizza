import React, { useEffect, useState } from "react";

import { Alert, Platform } from "react-native";

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
import { useNavigation, useRoute } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";

import { ProductRouteNavigationProps } from "../../@types/navigation";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { ProductProps } from "../../components/ProductCard";
import { RadioButton } from "../../components/RadioButton";
import { useAuth } from "../../hooks/auth";
import { PIZZA_SIZES } from "../../utils/pizzaTypes";

type ProductResponse = ProductProps & {
  size_prices: {
    [key: string]: number;
  };
};

export function Order() {
  const [selectedSize, setSelectedSize] = useState("");
  const [product, setProduct] = useState<ProductResponse>(
    {} as ProductResponse
  );
  const [quantity, setQuantity] = useState(0);
  const [tableNumber, setTableNumber] = useState("");
  const [isOrderBeingSent, setIsOrderBeingSent] = useState(false);

  const navigation = useNavigation();
  const { user } = useAuth();
  const route = useRoute();

  const { id } = route.params as ProductRouteNavigationProps;

  const amount = selectedSize
    ? product.size_prices[selectedSize] * quantity
    : "0,00";

  useEffect(() => {
    if (id) {
      firestore()
        .collection("pizzas")
        .doc(id)
        .get()
        .then((response) => setProduct(response.data() as ProductResponse))
        .catch(() =>
          Alert.alert("Pedito", "Não foi possível carregar os dados do Produto")
        );
    }
  }, [id]);

  const handleSendOrder = () => {
    if (!selectedSize) {
      return Alert.alert("Pedido", "Selecione o tamanho da pizza");
    }

    if (!tableNumber) {
      return Alert.alert("Pedido", "Informe o número da mesa");
    }

    if (!amount) {
      return Alert.alert("Pedido", "Informe a quantidade");
    }

    setIsOrderBeingSent(true);

    firestore()
      .collection("orders")
      .add({
        quantity,
        amount,
        product: product.name,
        size: selectedSize,
        table_number: tableNumber,
        status: "Ongoing",
        waiter_id: user?.id,
        image: product.image_url,
      })
      .then(() => navigation.navigate("Home"))
      .catch(() => {
        Alert.alert("Pedido", "Não foi possível processar o pedido");
        setIsOrderBeingSent(false);
      });
  };

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ContentScroll>
        <Header>
          <BackButton
            onPress={() => navigation.goBack()}
            style={{ marginBottom: 108 }}
          />
        </Header>
        <Image source={{ uri: product.image_url }} />

        <Form>
          <FormHeader>{product.name}</FormHeader>
          <Label>Selecione um tamanho</Label>
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
              <Input keyboardType="numeric" onChangeText={setTableNumber} />
            </InputGroup>

            <InputGroup>
              <Label>Quantidade</Label>
              <Input
                keyboardType="numeric"
                onChangeText={(value) => setQuantity(Number(value))}
              />
            </InputGroup>
          </FormGroupRow>

          <Price>Valor: R$ {amount}</Price>

          <Button
            title="Confirmar pedido"
            onPress={handleSendOrder}
            isLoading={isOrderBeingSent}
          />
        </Form>
      </ContentScroll>
    </Container>
  );
}
