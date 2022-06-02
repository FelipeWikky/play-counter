import { format } from "date-fns";
import { useMemo } from "react";
import { Header, MonthLabel, PartialGreenRed } from "./styles";

interface HomeHeaderProps {
    greens?: number;
    reds?: number;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ greens = 0, reds = 0 }) => {
    const firstDayOfMonth = useMemo(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    }, []);

    return (
        <Header>
            <MonthLabel>
                {format(firstDayOfMonth, "MMMM / yyyy")}
            </MonthLabel>
            <PartialGreenRed>Green: {greens} | Red: {reds}</PartialGreenRed>
        </Header>
    )
}