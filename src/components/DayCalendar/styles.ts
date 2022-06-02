import styled from "styled-components/native";

export const Container = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
`;

export const DayLabelContainer = styled.View`
    width: 12%;
    margin: 1%;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
`;
export const DayLabel = styled.Text`
    font-size: ${({ theme }) => theme.SIZE.NORMAL}px;
    color: ${({ theme }) => theme.COLORS.BORDER_LOW};
    font-family: ${({ theme }) => theme.FONTS.MEDIUM};
`;
