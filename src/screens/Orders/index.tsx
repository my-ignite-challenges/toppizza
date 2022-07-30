import { useEffect, useState } from "react";

import { Alert, FlatList } from "react-native";

import firestore from "@react-native-firebase/firestore";

import { Container, Header, Title } from "./styles";

import { ItemSeparator } from "../../components/ItemSeparator";
import { OrderCard, OrderProps } from "../../components/OrderCard";
import { useAuth } from "../../hooks/auth";

export function Orders() {
  const [orders, setOrders] = useState<OrderProps[]>();

  const { user } = useAuth();

  const handlePizzaDelivery = (id: string) => {
    Alert.alert("Pedido", "Deseja confirmar a entrega da pizza?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => {
          firestore().collection("orders").doc(id).update({
            status: "Delivered",
          });
        },
      },
    ]);
  };

  useEffect(() => {
    const subscribe = firestore()
      .collection("orders")
      .where("waiter_id", "==", user?.id)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as OrderProps[];

        setOrders(data);
      });

    return () => subscribe();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Pedidos Realizados</Title>
      </Header>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <OrderCard
            index={index}
            data={item}
            disabled={item.status === "Delivered"}
            onPress={() => handlePizzaDelivery(item.id)}
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 125, paddingHorizontal: 24 }}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </Container>
  );
}
