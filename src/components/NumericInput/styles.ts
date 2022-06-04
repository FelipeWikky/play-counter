import styled from "styled-components/native";
import { THEME } from "../../theme";

export const Container = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const NumericField = styled.TextInput`
    min-width: 40px;
    height: 32px;
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-color: ${({theme}) => theme.COLORS.BORDER_VERY_LOW};
    background-color: transparent;
    align-items: center;
    text-align: center;
    padding: 0px 
`;

type SymbolButtonProps = {  
    side: "left" | "right";
    color: keyof typeof THEME.COLORS
}

export const SymbolButton = styled.TouchableOpacity.attrs((props) => ({
    activeOpacity: 0.7
}))<SymbolButtonProps>`
    width: 32px;
    height: 32px;
    justify-content: center;
    align-items: center;
    background-color: ${({theme, color}) => theme.COLORS[color]};
    border-top-left-radius: ${({side}) => side === "left" ? 15 : 0}px;
    border-bottom-left-radius: ${({side}) => side === "left" ? 15 : 0}px;

    border-top-right-radius: ${({side}) => side === "right" ? 15 : 0}px;
    border-bottom-right-radius: ${({side}) => side === "right" ? 15 : 0}px;
`;