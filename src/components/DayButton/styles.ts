import styled from "styled-components/native";
import { DayButtonProps } from ".";

export const DayClicker = styled.TouchableOpacity<DayButtonProps>`
    /* width: 14.28%; */
    width: 12%;
    margin: 1%;
    /* margin: 2% 2%; */
    height: 40px;
    background-color: ${({ theme, notShow, selected }) => notShow ? "transparent" : selected ? theme.COLORS.BORDER : theme.COLORS.BORDER_VERY_LOW};
    border-width: 1px;
    border-color: ${({ theme, notShow }) => notShow ? "transparent" : theme.COLORS.BORDER_LOW};
    align-items: center;
    justify-content: center;
`;