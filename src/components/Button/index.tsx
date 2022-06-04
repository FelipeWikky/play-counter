import React, { useCallback } from "react";
import { TouchableOpacityProps } from "react-native";
import { THEME } from "../../theme";
import { Label, LabelProps } from "../Label";
import { StyledButton } from "./styles";

export interface StyleProps {
    borderRadius?: number;
    width?: string | number;
    height?: string | number;
}

export interface ButtonProps extends TouchableOpacityProps {
    children?: React.ReactNode;
    labelProps?: LabelProps;
    color: keyof typeof THEME.COLORS;
    styleProps?: StyleProps;
}

export const Button: React.FC<ButtonProps> = (props) => {
    const { children, labelProps } = props;

    const getChildren = useCallback(() => {
        if (labelProps && labelProps.label) {
            return (
                <Label {...labelProps}>
                    {labelProps.label}
                </Label>
            );
        } else {
            return children;
        }
    }, [children, labelProps]);

    return (
        <StyledButton {...props}>
            {getChildren()}
        </StyledButton>
    );
}