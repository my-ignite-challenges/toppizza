import React from "react";

import { Feather } from "@expo/vector-icons";
import { RectButtonProps } from "react-native-gesture-handler";

import {
  Container,
  Content,
  Description,
  Details,
  DetailsHeader,
  Divider,
  Name,
  ProductImage,
} from "./styles";
import { useTheme } from "styled-components/native";

export type ProductProps = {
  id: string;
  image_url: string;
  name: string;
  description: string;
};

type Props = RectButtonProps & {
  data: ProductProps;
};

export function ProductCard({ data, ...rest }: Props) {
  const { COLORS } = useTheme();

  return (
    <Container>
      <Content {...rest}>
        <ProductImage source={{ uri: data.image_url }} />

        <Details>
          <DetailsHeader>
            <Name>{data.name}</Name>
            <Feather name="chevron-right" size={18} color={COLORS.SHAPE} />
          </DetailsHeader>

          <Description>{data.description}</Description>
        </Details>
      </Content>
      <Divider />
    </Container>
  );
}
