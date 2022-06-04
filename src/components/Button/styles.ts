import styled from "styled-components/native";
import { ButtonProps, Button } from ".";

export const StyledButton = styled.TouchableOpacity<ButtonProps>`
    background-color: ${({ theme, color }) => theme.COLORS[color]};
    width: ${({ styleProps }) => getButtonWidth(styleProps?.width)};
    height: ${({ styleProps }) => getButtonHeight(styleProps?.height)};
    align-items: center;
    justify-content: center;
    border-radius: ${({ styleProps }) => (styleProps?.borderRadius || 0) + "px"};
`;

const getButtonWidth = (width?: React.ComponentProps<typeof Button>['styleProps']['width']) => {
    if (!width) return "100%";
    if (typeof (width) === "string") {
        if (width.includes('%')) return width;
        if (!width.includes('px')) return width + "px";
    } else {
        return String(width) + "px";
    }
}

const getButtonHeight = (height?: React.ComponentProps<typeof Button>['styleProps']['height']) => {
    if (!height) return "100%";
    if (typeof (height) === "string") {
        if (height.includes('%')) return height;
        if (!height.includes('px')) return height + "px";
    } else {
        return String(height) + "px";
    }
}