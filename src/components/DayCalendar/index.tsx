import { format } from "date-fns";
import { useMemo } from "react";
import { DayButton } from "../DayButton"
import { Container, DayLabel, DayLabelContainer } from "./styles"

interface DayCalendar {
    daySelected: string;
    handleSelectDay: (day: string) => void;
}

export const DayCalendar: React.FC<DayCalendar> = ({ daySelected, handleSelectDay }) => {

    const acronyms = useMemo(() => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], []);

    const firstDayOfMonth = useMemo(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    }, []);

    const days = useMemo(() => {
        const dayNumbers = [
            "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
            "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
            "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
            "31"
        ];

        const acronymOfDay = format(firstDayOfMonth, "E");
        let emptyValues = 0;

        for (let i = 0; i < acronyms.length; i++) {
            if (acronyms[i] === acronymOfDay) break;
            emptyValues++;
        }

        const emptyArray = new Array(emptyValues).fill(" ");

        return [...emptyArray, ...dayNumbers];
    }
        , [firstDayOfMonth]);

    return (
        <>
            <Container>
                {acronyms.map((ac, index) => (
                    <DayLabelContainer key={index}>
                        <DayLabel>
                            {ac}
                        </DayLabel>
                    </DayLabelContainer>
                ))}
            </Container>
            <Container>
                {days.map((item, index) => (
                    <DayButton
                        key={index}
                        label={item}
                        notShow={!(item.trim())}
                        onPress={() => handleSelectDay(item)}
                        selected={daySelected === item}
                    />
                ))}
            </Container>
        </>
    )
}