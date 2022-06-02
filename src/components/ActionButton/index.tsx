import { TouchableOpacityProps } from "react-native";
import { ActionClicker, ActionLabel } from "./styles";

export interface ActionButtonProps extends TouchableOpacityProps {
    type: "green" | "red"
}

export const ActionButton: React.FC<ActionButtonProps> = (props) => {
    return (
        <ActionClicker {...props}>
            <ActionLabel>
                {`${props.type.substring(0, 1).toUpperCase() + props.type.substring(1)}`}
            </ActionLabel>
        </ActionClicker>
    );
}