import React from "react";
import { TextInputProps } from "react-native";

import { Container, InputTypeProps } from "./styles";

type Props = TextInputProps & {
  type?: InputTypeProps;
};

export function Input({ type = "primary", ...rest }: Props) {
  return <Container type={type} {...rest} />;
}
