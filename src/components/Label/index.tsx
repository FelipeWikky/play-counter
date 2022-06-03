import React from "react";
import { THEME } from "../../theme";
import { StyledLabel } from "./styles";

export interface LabelProps {
    color?: keyof typeof THEME.COLORS;
    customColor?: string;
    size?: keyof typeof THEME.SIZE;
    font: keyof typeof THEME.FONTS;
    children?: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({children, ...props}) => {
    return (
        <StyledLabel {...props}>
            {children}
        </StyledLabel>
    );
}