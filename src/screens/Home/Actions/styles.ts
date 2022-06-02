import styled from "styled-components/native";

export const ActionContainer = styled.View`
    flex-wrap: nowrap;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
`;

export const CounterInformation = styled.View`
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    margin: 12px 0px;
`;

export const CounterGreen = styled.Text`
    color: green;
    font-size: ${({theme}) => theme.SIZE.NORMAL}px;
    font-family: ${({theme}) => theme.FONTS.MEDIUM};
`;
export const CounterRed = styled.Text`
    color: red;
    font-size: ${({theme}) => theme.SIZE.NORMAL}px;
    font-family: ${({theme}) => theme.FONTS.MEDIUM};
`;