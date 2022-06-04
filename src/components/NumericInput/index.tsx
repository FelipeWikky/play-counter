import React, { useCallback } from "react";
import { TextInputProps } from "react-native";
import { Label } from "../Label";
import { Container, NumericField, SymbolButton } from "./styles";

interface NumericInputProps extends Omit<TextInputProps, "value"> {
    value?: number;
    onChangeValue: (value: number) => void;
    onInscrease: (valueIncreased: number) => void;
    onDecrease: (valueDecreased: number) => void;
    max?: number;
    min?: number;
}

export const NumericInput: React.FC<NumericInputProps> = (props) => {
    const { value = 0, onInscrease, onDecrease, onChangeValue, max = -1, min = -1 } = props;

    const onIncreaseValue = useCallback((value: number) => {
        const numberValue = Number(value) || 0;
        if (numberValue || numberValue === 0) {
            if (max === -1) {
                onInscrease(numberValue + 1);
                return;
            }
            if ((numberValue + 1) > max) return;
            onInscrease(numberValue + 1);
            return;
        }
        onInscrease(0);
        return;
    }, [onInscrease, max]);

    const onDecreaseValue = useCallback((value: number) => {
        const numberValue = Number(value) || 0;
        if (numberValue || numberValue === 0) {
            if (min === -1) {
                onInscrease(numberValue - 1);
                return;
            }
            if ((numberValue - 1) < min) return;
            onInscrease(numberValue - 1);
            return;
        }
        onInscrease(0);
        return;
    }, [onDecrease, min]);

    return (
        <Container>
            <SymbolButton
                side="left" color="DEFAULT"
                onPress={() => onDecreaseValue(value)}
            >
                <Label size="NORMAL" font="BOLD" color="WHITE">
                    -
                </Label>
            </SymbolButton>

            <NumericField
                {...props}
                defaultValue="0"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                autoCompleteType="off"
                value={value.toString()}
                onChangeText={text => {
                    if (Number(text)) {
                        onChangeValue(Number(text))
                    } else {
                        onChangeValue(0);
                    }
                }}
            />

            <SymbolButton
                side="right" color="DEFAULT"
                onPress={() => onIncreaseValue(value)}
            >
                <Label size="NORMAL" font="BOLD" color="WHITE">
                    +
                </Label>
            </SymbolButton>
        </Container>
    );
}