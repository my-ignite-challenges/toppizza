import { ScreenStackHeaderBackButtonImage } from "react-native-screens";
import { Container, Notification, NotificationsCount, Title } from "./styles";

type Props = {
  title: string;
  color: string;
  notificationsCount?: string | undefined;
};

export function BottomTabsMenu({ title, color, notificationsCount }: Props) {
  const hasNotifications = notificationsCount > "0";

  return (
    <Container>
      <Title color={color}>{title}</Title>

      {notificationsCount && (
        <Notification hasNotifications={hasNotifications}>
          <NotificationsCount hasNotifications={hasNotifications}>
            {notificationsCount}
          </NotificationsCount>
        </Notification>
      )}
    </Container>
  );
}
