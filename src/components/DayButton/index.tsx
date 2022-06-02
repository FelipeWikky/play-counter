import { Text, TouchableOpacityProps } from "react-native";
import { DayClicker } from "./styles";

export interface DayButtonProps extends TouchableOpacityProps {
    label: string;
    notShow?: boolean;
    selected?: boolean;
}

export const DayButton: React.FC<DayButtonProps> = ({ label, notShow = false, ...props }) => {
    return (
        <DayClicker {...(props as any)} notShow={notShow}>
            <Text>{label}</Text>
        </DayClicker>
    )
};