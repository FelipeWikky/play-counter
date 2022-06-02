import { format } from "date-fns"

export const getFixedDay = (day: string, date: Date) => {
    const formattedDate = format(date, "dd/MM/yyyy");
    const split = formattedDate.split('/');
    return `${day}/${split[1]}/${split[2]}`;
}