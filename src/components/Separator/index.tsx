import styled from "styled-components/native";

export const Separator = styled.View`
    height: 1px;
    background-color: ${({ theme }) => theme.COLORS.BORDER_LOW};
    width: 90%;
    margin: 24px 0px;
`;