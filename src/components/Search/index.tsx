import React from "react";
import { Button, ClearButton, Container, Input, InputArea } from "./styles.";
import { Feather } from "@expo/vector-icons";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

type Props = TextInputProps & {
  onSearch: () => void;
  onClear: () => void;
};

export function Search({ onSearch, onClear }: Props) {
  const { COLORS } = useTheme();

  return (
    <Container>
      <InputArea>
        <Input placeholder="Pesquisar..." />
        <ClearButton onPress={onClear}>
          <Feather name="x" size={16} />
        </ClearButton>
      </InputArea>

      <Button onPress={onSearch}>
        <Feather name="search" size={16} color={COLORS.TITLE} />
      </Button>
    </Container>
  );
}
