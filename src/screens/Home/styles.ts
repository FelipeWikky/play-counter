import styled from "styled-components/native";

export const Container = styled.KeyboardAvoidingView`
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
    align-items: center;
`;
