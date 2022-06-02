import styled from "styled-components/native";
import { ActionButtonProps } from ".";

export const ActionClicker = styled.TouchableOpacity<ActionButtonProps>`
    height: 44px;
    width: 48%;
    background-color: ${({ type }) => type};
    justify-content: center;
    align-items: center;
`;

export const ActionLabel = styled.Text`
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-size: ${({ theme }) => theme.SIZE.NORMAL}px;
    font-family: ${({ theme }) => theme.FONTS.MEDIUM};
`;