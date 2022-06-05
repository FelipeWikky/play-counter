import React, { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { Alert, Text } from "react-native";
import { Container } from "./styles";
import { useCounter } from "../../hooks/useCounter";
import { getFixedDay } from "../../utils";
import { Counter } from "../../models/Counter";
import { Separator } from "../../components/Separator";
import { HomeHeader } from "./Header";
import { DayCalendar } from "../../components/DayCalendar";
import { HomeActions } from "./Actions";
import { HomeModalFooter } from "./ModalFooter";

export const HomeScreen: React.FC = () => {
    const { executeGreen, executeRed, getCounter, getGreensAndReds, stopGreen, stopRed, refetchCount, refetchedCount } = useCounter();
    const modalRef = useRef<BottomSheet>(null);

    const [daySelected, setDaySelected] = useState("");

    const [loadingCounterSelected, setLoadingCounterSelected] = useState(false);
    const [counterSelected, setCounterSelected] = useState<Counter | null>(null);

    const [allGreenRed, setAllGreenRed] = useState<Counter>({ green: 0, red: 0 });

    const loadGreensAndReds = async () => {
        const counters = await getGreensAndReds();
        if (counters) {
            let greens = 0;
            let reds = 0;
            counters?.forEach(counter => {
                greens += counter.green;
                reds += counter.red;
            });
            setAllGreenRed({
                green: greens, red: reds
            });
        }
    }

    useEffect(() => {
        loadGreensAndReds();
    }, [refetchedCount]);

    const fetchCounterSelected = useCallback(async (day?: string) => {
        try {
            setLoadingCounterSelected(true);
            const date = getFixedDay(day || daySelected, new Date());
            const counter = await getCounter(date);
            setCounterSelected(counter);
        } catch (error) {
            console.error("Erro em fetchCounterSelected ", error)
        } finally {
            setLoadingCounterSelected(false);
        }
    }, [daySelected]);


    const handleSelectDay = useCallback(async (day: string) => {
        setDaySelected(prev => prev === day ? "" : day);
        fetchCounterSelected(day)
    }, []);

    const handlePressGreenOrRed = useCallback(async (type: "Green" | "Red") => {
        const date = getFixedDay(daySelected, new Date());
        const counterExecuted = type === "Green"
            ? await executeGreen(date, Alert)
            : await executeRed(date, Alert);

        if (counterExecuted) {
            refetchCount();
            Alert.alert(`${type}`, `${type} contabilizado`);
            fetchCounterSelected();
        } else if (counterExecuted !== false) {
            Alert.alert(`${type}`, `Houve um problema ao contabilizar o ${type}`);
        }
    }, [daySelected, stopGreen, stopRed]);

    return (
        <Container>
            <HomeHeader
                greens={allGreenRed.green}
                reds={allGreenRed.red}
            />

            <DayCalendar daySelected={daySelected} handleSelectDay={handleSelectDay} />

            <Separator />

            {!!(daySelected) && (
                <HomeActions
                    handlePressGreenOrRed={handlePressGreenOrRed}
                    greenCount={counterSelected?.green || 0}
                    redCount={counterSelected?.red || 0}
                />
            )}

            <HomeModalFooter
                modalRef={modalRef}
            />

        </Container>
    );
}


