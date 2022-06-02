import React from "react";
import { ActionButton } from "../../../components/ActionButton";
import { ActionContainer, CounterGreen, CounterInformation, CounterRed } from "./styles";

interface HomeActionsProps {
    handlePressGreenOrRed: (type: "Green" | "Red") => void;
    greenCount: number;
    redCount: number
}

export const HomeActions: React.FC<HomeActionsProps> = ({ handlePressGreenOrRed, greenCount, redCount}) => {
    return (
        <>
            <ActionContainer>
                <ActionButton type="green" onPress={() => handlePressGreenOrRed("Green")} />
                <ActionButton type="red" onPress={() => handlePressGreenOrRed("Red")} />
            </ActionContainer>

            <CounterInformation>
                <CounterGreen>Greens: {greenCount}</CounterGreen>
                <CounterRed>Reds: {redCount}</CounterRed>
            </CounterInformation>
        </>
    );
}