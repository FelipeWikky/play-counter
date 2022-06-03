import BottomSheet from "@gorhom/bottom-sheet";
import styled from "styled-components/native";

export const Modal = styled(BottomSheet).attrs(props => ({
    backgroundStyle: {
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.1)",
        backgroundColor: props.theme.COLORS.BACKGROUND
    }
}))`
`;

export const Header = styled.View`
    width: 100%;
    align-items: center;
    margin-bottom: 24px;
`;
export const Title = styled.Text`
    color: ${({ theme }) => theme.COLORS.TEXT};
    font-size: ${({ theme }) => theme.SIZE.NORMAL}px;
    font-family: ${({ theme }) => theme.FONTS.MEDIUM};
`;

export const Container = styled.View`
    height: 95%;
`;

export const StopContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;
export const StopContent = styled.View`
    flex-direction: column;
    width: 30%;
`;

type StopProps = {
    type: "green" | "red"
}

export const StopInput = styled.TextInput<StopProps>`
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme, type }) => type || theme.COLORS.BORDER};
    height: 32px;
`;

export const ValuesContainer = styled.View`
    margin: 12px;
`;

export const ValueInput = styled.TextInput`
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }) => theme.COLORS.BORDER};
    height: 32px;
`;
