import styled, { css } from "styled-components/native";
// import { RectButton } from "react-native-gesture-handler";

import { TouchableOpacity } from "react-native";

export type ButtonTypeProps = "primary" | "secondary";

type Props = {
  type: ButtonTypeProps;
};

export const Container = styled(TouchableOpacity)<Props>`
  flex: 1;
  max-height: 56px;
  min-height: 56px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;

  background-color: ${({ theme, type }) =>
    type === "primary" ? theme.COLORS.SUCCESS_900 : theme.COLORS.PRIMARY_800};
`;

export const Title = styled.Text`
  font-size: 14px;

  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-family: ${theme.FONTS.TEXT};
  `}
`;

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.TITLE,
}))``;
