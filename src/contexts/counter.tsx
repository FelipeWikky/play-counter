import React, { createContext, useCallback, useEffect, useState } from "react";

interface CounterContextType {
    stopGreen: number | null;
    changeStopGreen: (maxGreenPerDay: number) => void;
    stopRed: number | null;
    changeStopRed: (maxGreenPerDay: number) => void;
    betAmount: number;
    changeBetAmount: (amount: number) => void;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const CounterContext = createContext<CounterContextType>({} as CounterContextType);

export const CounterProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [stopGreen, setStopGreen] = useState(0);
    const [stopRed, setStopRed] = useState(0);
    const [betAmount, setBetAmount] = useState(0);

    const changeStopGreen = useCallback((maxGreenPerDay: number) => {
        setStopGreen(maxGreenPerDay)
    }, []);

    const changeStopRed = useCallback((maxRedPerDay: number) => {
        setStopRed(maxRedPerDay)
    }, []);

    const changeBetAmount = useCallback((amount: number) => {
        setBetAmount(amount);
    }, []);

    return (
        <CounterContext.Provider
            value={{
                stopGreen, stopRed,
                changeStopGreen, changeStopRed,
                betAmount, changeBetAmount
            }}
        >
            {children}
        </CounterContext.Provider>
    );
};

export default CounterContext;