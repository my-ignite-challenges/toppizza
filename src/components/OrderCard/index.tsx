import { TouchableOpacityProps } from "react-native";
import {
  Container,
  Image,
  Name,
  OrderStausType,
  StatusContainer,
  StatusLabel,
  TableDescription,
} from "./styles";

export type OrderProps = {
  id: string;
  product: string;
  image: string;
  status: OrderStausType;
  table_number: string;
  quantity: string;
};

type Props = TouchableOpacityProps & {
  index: number;
  data: OrderProps;
};

enum OrderStatus {
  Delivered = "Entregue",
  Ongoing = "Preparando",
  Ready = "Pronto",
}

export function OrderCard({ index, data, ...rest }: Props) {
  return (
    <Container index={index} {...rest} accessibilityRole="button">
      <Image source={{ uri: data.image }} />

      <Name>{data.product}</Name>

      <TableDescription>
        Mesa {data.table_number} ● Qnt: {data.quantity}
      </TableDescription>

      <StatusContainer status={data.status}>
        <StatusLabel status={data.status}>
          {OrderStatus[data.status]}
        </StatusLabel>
      </StatusContainer>
    </Container>
  );
}
