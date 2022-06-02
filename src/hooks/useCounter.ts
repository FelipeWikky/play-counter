import AsyncStorage from "@react-native-async-storage/async-storage";
import { Counter } from "../models/Counter";

const STORAGE_KEY = "PlayCounter_counter";

export const useCounter = () => {

    const executeGreen = async (date: string) => {
        try {
            const storageCounter = await AsyncStorage.getItem(STORAGE_KEY);

            if (storageCounter) {
                const parsed: Object = JSON.parse(storageCounter);

                let counter: Counter = parsed[date] as Counter;
                if (counter) {
                    counter.green = counter.green + 1;
                    await AsyncStorage.setItem(
                        STORAGE_KEY,
                        JSON.stringify(
                            {
                                ...parsed,
                                [date]: counter
                            }
                        )
                    );
                    return counter;
                } else {
                    counter = {
                        green: 1,
                        red: 0
                    }
                    await AsyncStorage.setItem(
                        STORAGE_KEY,
                        JSON.stringify(
                            {
                                ...parsed,
                                [date]: counter
                            }
                        )
                    );
                    return counter;
                }
            }
            const counter: Counter = {
                green: 1,
                red: 0
            };
            await AsyncStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(
                    {
                        [date]: counter
                    }
                )
            );
            return counter;
        } catch (error) {
            console.error("Error on execute green: ", error);
            null;
        }
    }

    const executeRed = async (date: string) => {
        try {
            const storageCounter = await AsyncStorage.getItem(STORAGE_KEY);

            if (storageCounter) {
                const parsed: Object = JSON.parse(storageCounter);

                let counter: Counter = parsed[date] as Counter;
                if (counter) {
                    counter.red = counter.red + 1;
                    await AsyncStorage.setItem(
                        STORAGE_KEY,
                        JSON.stringify(
                            {
                                ...parsed,
                                [date]: counter
                            }
                        )
                    );
                    return true;
                } else {
                    counter = {
                        green: 0,
                        red: 1
                    }
                    await AsyncStorage.setItem(
                        STORAGE_KEY,
                        JSON.stringify(
                            {
                                ...parsed,
                                [date]: counter
                            }
                        )
                    );
                    return true;
                }

            }
            const counter: Counter = {
                green: 0,
                red: 1
            };
            await AsyncStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(
                    {
                        [date]: counter
                    }
                )
            );
            return true;
        } catch (error) {
            console.error("Error on execute red: ", error);
            false;
        }
    }

    const getCounter = async (date: string): Promise<Counter> => {
        let defaultCounter: Counter = {
            green: 0,
            red: 0
        };
        try {
            const storageCounter = await AsyncStorage.getItem(STORAGE_KEY);
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
            const storageCounter = await AsyncStorage.getItem(STORAGE_KEY);
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
        executeGreen, executeRed, getCounter, getGreensAndReds
    };
};
