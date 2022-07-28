import styled, { css } from "styled-components/native";

type ContainerProps = {
  index: number;
};

export type OrderStausType = "Ongoing" | "Ready" | "Delivered";

type OrderStatusProps = {
  status: OrderStausType;
};

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: 50%;
  align-items: center;
  padding: 24px;

  ${({ theme, index }) => css`
    border-right-width: ${index % 2 > 0 ? 0 : 1}px;
    border-right-color: ${theme.COLORS.SHAPE};
  `}
`;

export const Image = styled.Image`
  width: 104px;
  height: 104px;
  border-radius: 52px;
`;

export const Name = styled.Text`
  font-size: 20px;
  margin-top: 21px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const TableDescription = styled.Text`
  font-size: 14px;
  margin-top: 11px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_400};
  `}
`;

export const StatusContainer = styled.View<OrderStatusProps>`
  padding: 4px 16px;
  border-radius: 12px;
  margin-top: 16px;
  align-items: center;
  justify-content: center;

  ${({ status, theme }) =>
    status === "Ongoing" &&
    css`
      background-color: ${theme.COLORS.ALERT_50};
      border: ${theme.COLORS.ALERT_900};
    `}

  ${({ status, theme }) =>
    status === "Ready" &&
    css`
      background-color: ${theme.COLORS.SUCCESS_900};
    `}

    ${({ status, theme }) =>
    status === "Delivered" &&
    css`
      background-color: ${theme.COLORS.SECONDARY_900};
    `}
`;

export const StatusLabel = styled.Text<OrderStatusProps>`
  font-size: 12px;
  line-height: 20px;

  ${({ status, theme }) =>
    css`
      font-family: ${theme.FONTS.TEXT};
      color: ${status === "Ongoing"
        ? theme.COLORS.ALERT_900
        : theme.COLORS.TITLE};
    `}
`;
