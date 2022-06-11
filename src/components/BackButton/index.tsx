import React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import { Container } from "./styles";
import { TouchableOpacityProps } from "react-native";

export function BackButton(props: TouchableOpacityProps) {
  const { COLORS } = useTheme();

  return (
    <Container {...props}>
      <MaterialIcons name="chevron-left" size={18} color={COLORS.TITLE} />
    </Container>
  );
}
