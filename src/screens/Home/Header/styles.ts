import styled from "styled-components/native";

export const Header = styled.View`
    width: 100%;
    align-items: center;
    margin: 12px 0px;
`;

export const MonthLabel = styled.Text`
    font-size: ${({ theme }) => theme.SIZE.TITLE}px;
    color: ${({ theme }) => theme.COLORS.DEFAULT};
    font-family: ${({ theme }) => theme.FONTS.BOLD};
    margin-bottom: 4px;
`;

export const PartialGreenRed = styled.Text`
    font-size: ${({ theme }) => theme.SIZE.NORMAL_SMALL}px;
    color: ${({ theme }) => theme.COLORS.DEFAULT};
    font-family: ${({ theme }) => theme.FONTS.MEDIUM};
`;