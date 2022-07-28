import { TouchableOpacityProps} from "react-native";
import {
  Container,
  RadioButtonProps,
  Radio,
  SelectedElement,
  Title,
} from "./styles";

type Props = RadioButtonProps &
  TouchableOpacityProps & {
    title: string;
  };

export function RadioButton({ title, selected = false, ...rest }: Props) {
  return (
    <Container selected={selected} {...rest} accessibilityRole="button">
      <Radio>{selected && <SelectedElement />}</Radio>

      <Title>{title}</Title>
    </Container>
  );
}
