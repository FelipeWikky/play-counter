import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useContext, useEffect } from "react";
import { AlertStatic } from "react-native";
import CounterContext from "../contexts/counter";
import { Configuration } from "../models/Configuration";
import { Counter } from "../models/Counter";
import { Storage } from "../services/storage";
import { CounterStorage } from "../services/storage/counter";

const STORAGE_COUNTER_KEY = "PlayCounter_counter";

export const useCounter = () => {
    const {
        refetchCount, refetchedCount,
        configuration, setConfiguration
    } = useContext(CounterContext);

    const validateGreenAndRed = useCallback((type: "green" | "red", alert: AlertStatic, stopValue?: number) => {
        if (stopValue === null) {
            const message = `Defina seu Stop ${type} antes de contabilizar um ${type}`;
            alert.alert("Aviso", message);
            return false; // throw new Error(message);
        }
        if (stopValue === 0) {
            const message = `Seu Stop ${type} está definido como 0`;
            alert.alert("Aviso", message);
            return false; // throw new Error(message);
        }
        return true;
    }, []);

    const executeGreen = useCallback(async (date: string, alert: AlertStatic): Promise<Counter | false | null> => {
        if (!validateGreenAndRed("green", alert, configuration.stopGreen)) return false;
        try {
            let counter = await CounterStorage.get<Counter>(date);
            if (counter) {
                if (Number(counter?.green) >= configuration.stopGreen) {
                    alert.alert("Aviso", `Você já alcançou seu Stop green diário (${configuration.stopGreen})`);
                    return false;
                }

                counter.green = Number(counter.green) + 1;
                await CounterStorage.set<Counter>(counter, date);
                return counter;
            } else {
                counter = {
                    green: 1,
                    red: 0
                }
                await CounterStorage.set<Counter>(counter, date);
                return counter;
            }
        } catch (error: any) {
            console.error("Error on execute green: ", error);
            return null;
        }
    }, [configuration]);

    const executeRed = useCallback(async (date: string, alert: AlertStatic): Promise<Counter | false | null> => {
        if (!validateGreenAndRed("red", alert, configuration.stopRed)) return false;

        try {
            let counter = await CounterStorage.get<Counter>(date);

            if (counter) {
                if (Number(counter?.red) >= configuration.stopRed) {
                    alert.alert("Aviso", `Você já alcançou seu Stop red diário (${configuration.stopRed})`);
                    return false;
                }

                counter.red = Number(counter.red) + 1;
                await CounterStorage.set<Counter>(counter, date);
                return counter;
            } else {
                counter = {
                    green: 0,
                    red: 1
                }
                await CounterStorage.set<Counter>(counter, date);
                return counter;
            }
        } catch (error) {
            console.error("Error on execute red: ", error);
            return null;
        }
    }, [configuration])

    const getCounter = async (date: string): Promise<Counter> => {
        let defaultCounter: Counter = {
            green: 0,
            red: 0
        };
        try {
            const storageCounter = await AsyncStorage.getItem(STORAGE_COUNTER_KEY);
            if (storageCounter) {
                const parsed: Object = JSON.parse(storageCounter);

                let counter: Counter = parsed[date] as Counter;
                if (counter) {
                    return counter;
                }
                return defaultCounter;
            }
        } catch (error) {
            console.error("Erro em getCounter: ", error);
            return defaultCounter;
        }
    }

    const getGreensAndReds = useCallback(async (): Promise<Counter[]> => {
        try {
            const storageCounter = await AsyncStorage.getItem(STORAGE_COUNTER_KEY);
            const counters: Counter[] = [];

            if (storageCounter) {
                const parsed: Object = JSON.parse(storageCounter);
                if (parsed && Object.keys(parsed).length > 0) {

                    for (const key of Object.keys(parsed)) {
                        if (key && parsed[key]) {
                            counters.push({
                                ...parsed[key],
                                date: key,
                            })
                        }
                    }
                }
            }
            return counters;
        } catch (error) {
            console.error("Erro em getGreensAndReds: ", error);
            return [];
        }
    }, [refetchedCount]);

    const clearCounter = async (): Promise<boolean> => {
        const cleaned = await CounterStorage.remove();
        refetchCount();
        return cleaned;
    }

    const handleChangeConfiguration = useCallback(async (newConfiguration: Configuration) => {
        const STORAGE_CONFIGURATION_KEY = "PlayCounter_configurations";
        const storage = new Storage<Configuration>(STORAGE_CONFIGURATION_KEY);
        const mergedConfiguration = {...configuration, ...newConfiguration};
        setConfiguration(mergedConfiguration);
        await storage.set<Configuration>(mergedConfiguration);
    }, [configuration]);

    return {
        executeGreen, executeRed, getCounter, getGreensAndReds, clearCounter,
        refetchedCount, refetchCount,
        configuration, handleChangeConfiguration
    };
};
