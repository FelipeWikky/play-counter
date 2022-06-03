import styled from "styled-components/native";
import { LabelProps } from ".";

export const StyledLabel = styled.Text<LabelProps>`
    color: ${({theme, color, customColor}) => color ? theme.COLORS[(color as any)] : customColor || theme.COLORS.TEXT};
    font-size: ${({theme, size}) => theme.SIZE[(size as any)]}px;
    font-family: ${({theme, font}) => theme.FONTS[(font as any)]};
`;