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

export const Header = styled.TouchableOpacity.attrs(props => ({
    activeOpacity: 1
}))`
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
    height: 90%;
`;

export const StopContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;
export const StopContent = styled.View`
    flex-direction: column;
    width: 30%;
    align-items: center;
    justify-content: space-between;
    height: 56px;
`;

type StopProps = {
    type: "green" | "red"
}

export const ValuesContainer = styled.View`
    margin: 12px;
`;

export const ValueInput = styled.TextInput.attrs(props => ({
    keyboardType: "numeric",
    defaultValue: "0",
    autoCapitalize: "none",
    autoCorrect: false,
    autoCompleteType: "off"
}))`
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }) => theme.COLORS.BORDER};
    height: 32px;
`;

export const Footer = styled.View`
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    margin: 0px 12px;
    margin-bottom: 36px;
    height: 10%;
`;