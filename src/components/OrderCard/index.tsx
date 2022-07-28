import { TouchableOpacityProps } from "react-native";
import {
  Container,
  Image,
  Name,
  StatusContainer,
  StatusLabel,
  TableDescription,
} from "./styles";

type Props = TouchableOpacityProps & {
  index: number;
};

export function OrderCard({ index, ...rest }: Props) {
  return (
    <Container index={index} {...rest} accessibilityRole="button">
      <Image source={{ uri: "https://github.com/georgewfsantos.png" }} />

      <Name>4 Queijos</Name>

      <TableDescription>Mesa 5 ● Qnt: 1</TableDescription>

      <StatusContainer status="Ongoing">
        <StatusLabel status="Ongoing">Preparando</StatusLabel>
      </StatusContainer>
    </Container>
  );
}
