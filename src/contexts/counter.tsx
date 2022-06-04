import React, { createContext, useCallback, useEffect, useState } from "react";

interface CounterContextType {
    stopGreen: number | null;
    handleChangeStopGreen: (maxGreenPerDay: number) => void;
    stopRed: number | null;
    handleChangeStopRed: (maxGreenPerDay: number) => void;
    betAmount: number;
    handleChangeBetAmount: (amount: number) => void;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const CounterContext = createContext<CounterContextType>({} as CounterContextType);

export const CounterProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [stopGreen, setStopGreen] = useState(0);
    const [stopRed, setStopRed] = useState(0);
    const [betAmount, setBetAmount] = useState(0);

    const handleChangeStopGreen = useCallback((maxGreenPerDay: number) => {
        setStopGreen(maxGreenPerDay)
    }, []);

    const handleChangeStopRed = useCallback((maxRedPerDay: number) => {
        setStopRed(maxRedPerDay)
    }, []);

    const handleChangeBetAmount = useCallback((amount: number) => {
        setBetAmount(amount);
    }, []);

    return (
        <CounterContext.Provider
            value={{
                stopGreen, stopRed,
                handleChangeStopGreen, handleChangeStopRed,
                betAmount, handleChangeBetAmount
            }}
        >
            {children}
        </CounterContext.Provider>
    );
};

export default CounterContext;