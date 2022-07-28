import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { useTheme } from "styled-components/native";
import { BottomTabsMenu } from "../components/BottomTabsMenu/ index";
import { Home } from "../screens/Home";
import { Orders } from "../screens/Orders";

const { Navigator, Screen } = createBottomTabNavigator();

export function UserBottomTabRoutes() {
  const { COLORS } = useTheme();

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.SECONDARY_900,
        tabBarInactiveTintColor: COLORS.SECONDARY_400,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
        },
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomTabsMenu title="Cardápio" color={color} />
          ),
        }}
      />
      <Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomTabsMenu
              title="Pedidos"
              color={color}
              notificationsCount="5"
            />
          ),
        }}
      />
    </Navigator>
  );
}
