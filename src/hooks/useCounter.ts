import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useContext, useEffect } from "react";
import { AlertStatic } from "react-native";
import CounterContext from "../contexts/counter";
import { Counter } from "../models/Counter";
import { CounterStorage } from "../services/storage/counter";

const STORAGE_COUNTER_KEY = "PlayCounter_counter";

export const useCounter = () => {
    const {
        betAmount, handleChangeBetAmount,
        stopGreen, handleChangeStopGreen,
        stopRed, handleChangeStopRed
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

    useEffect(() => {console.log("green ", stopGreen)}, [stopGreen])

    const executeGreen = useCallback(async (date: string, alert: AlertStatic): Promise<Counter | false | null> => {
        if (!validateGreenAndRed("green", alert, stopGreen)) return false;
        try {
            let counter = await CounterStorage.get<Counter>(date);
            if (counter) {
                if (Number(counter?.green) >= stopGreen) {
                    alert.alert("Aviso", `Você já alcançou seu Stop green diário (${stopGreen})`);
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
    }, [stopGreen]);

    const executeRed = async (date: string, alert: AlertStatic): Promise<Counter | false | null> => {
        if (!validateGreenAndRed("red", alert, stopGreen)) return false;

        try {
            let counter = await CounterStorage.get<Counter>(date);

            if (counter) {
                if (Number(counter?.red) >= stopRed) {
                    alert.alert("Aviso", `Você já alcançou seu Stop red diário (${stopRed})`);
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
    }

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

    const getGreensAndReds = async (): Promise<Counter[]> => {
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
    }

    return {
        executeGreen, executeRed, getCounter, getGreensAndReds,
        betAmount, handleChangeBetAmount, stopGreen, handleChangeStopGreen, stopRed, handleChangeStopRed
    };
};
