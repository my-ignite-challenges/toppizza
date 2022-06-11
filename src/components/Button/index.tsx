import React from "react";

// import { RectButtonProps } from "react-native-gesture-handler";
import { TouchableOpacityProps } from "react-native";

import { ButtonTypeProps, Container, Loading, Title } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
  type?: ButtonTypeProps;
  isLoading?: boolean;
};

export function Button({
  title,
  type = "primary",
  isLoading = false,
  ...rest
}: Props) {
  return (
    <Container type={type} disabled={isLoading} {...rest}>
      {isLoading ? <Loading /> : <Title>{title}</Title>}
    </Container>
  );
}
