import React, { createContext, useCallback, useEffect, useState } from "react";
import { Configuration } from "../models/Configuration";
import { ConfigurationStorage } from "../services/storage/configuration";

interface CounterContextType {
    refetchedCount: number;
    refetchCount: () => void;

    configuration: Configuration;
    setConfiguration: React.Dispatch<React.SetStateAction<Configuration>>;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const CounterContext = createContext<CounterContextType>({} as CounterContextType);

export const CounterProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [refetchedCount, setRefetchedCount] = useState(0);

    //TODO: separate configuration logic to new context
    const [configuration, setConfiguration] = useState<Configuration>({
        betAmount: 0,
        gainPerBet: 0,
        stopGreen: 0,
        stopRed: 0
    });

    const refetchCount = useCallback(() => {
        setRefetchedCount(prev => prev + 1);
    }, []);

    const loadConfiguration = useCallback(async() => {
        const storagedConfiguration = await ConfigurationStorage.get<Configuration>();
        if(storagedConfiguration) {
            setConfiguration(storagedConfiguration);
        } 
    }, []);

    useEffect(() => {
        loadConfiguration();
    }, []);

    return (
        <CounterContext.Provider
            value={{
                refetchCount, refetchedCount,
                configuration, setConfiguration,
            }}
        >
            {children}
        </CounterContext.Provider>
    );
};

export default CounterContext;