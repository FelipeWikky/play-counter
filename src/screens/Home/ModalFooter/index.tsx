import React, { useCallback, useRef, useState } from "react";
import { Container, Header, Modal, Title, StopInput, StopContainer, StopContent, ValuesContainer, ValueInput, Footer, FooterButton } from "./styles";
import BottomSheet from "@gorhom/bottom-sheet";
import { Label, LabelProps } from "../../../components/Label";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useCounter } from "../../../hooks/useCounter";
import { Button, StyleProps as StyleButtonProps } from "../../../components/Button";
import { NumericInput } from "../../../components/NumericInput";

interface Configuration {
    green: number;
    red: number;
    amount: number;
}

interface HomeModalFooterProps {
    modalRef?: React.MutableRefObject<BottomSheet>
}

export const HomeModalFooter: React.FC<HomeModalFooterProps> = ({ modalRef }) => {
    const innerRef = modalRef ? modalRef : useRef<BottomSheet>(null);
    const [modalOpened, setModalOpened] = useState(false);

    const {
        betAmount, handleChangeBetAmount,
        stopGreen, handleChangeStopGreen,
        stopRed, handleChangeStopRed,
        clearCounter
    } = useCounter();

    const [configuration, setConfiguration] = useState<Configuration>(
        { green: stopGreen || 0, red: stopRed || 0, amount: betAmount || 0 }
    );

    const getLabelProps = useCallback((label: string) => ({
        label: label,
        font: "MEDIUM",
        color: "WHITE",
        size: "NORMAL_SMALL"
    }) as LabelProps, []);

    const getButtonProps = useCallback(() => ({
        width: "40%",
        height: 52,
        borderRadius: 50
    }) as StyleButtonProps, []);

    const handleChangeInput = useCallback((key: keyof typeof configuration, value: string | number) => {
        setConfiguration(prev => ({
            ...prev,
            [key]: (String(value) && String(value).trim()) ? Number(value) : ""
        }))
    }, []);

    const handlePressSave = useCallback(() => {
        handleChangeBetAmount(configuration.amount);
        handleChangeStopGreen(configuration.green);
        handleChangeStopRed(configuration.red);
        innerRef?.current?.collapse()
    }, [configuration]);

    const handleResetCount = useCallback(async() => {
        Alert.alert(
            "Confirmação",
            "Deseja realmente resetar a contagem?\Isso deletará todas as contagens deste mês",
            [
                {
                    text: "Não",
                    style: "cancel"
                },
                {
                    text: "Sim",
                    onPress: async() => {
                        const reseted = await clearCounter();
                        if(reseted) {
                            Alert.alert("Confirmação", "Contagem resetada")
                        }
                    }
                }
            ]
        );
    }, [clearCounter]);

    return (
        <Modal
            ref={innerRef}
            index={0}
            snapPoints={['5.5%', '90%']}
            onChange={(index) => setModalOpened(!!(index))}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <Container>
                    <>
                        <Header
                            onPress={() => {
                                if (modalOpened) {
                                    innerRef?.current?.collapse();
                                } else {
                                    innerRef?.current?.expand();
                                }
                            }}
                        >
                            <Title>Configurações</Title>
                        </Header>

                        <StopContainer>
                            <StopContent>
                                <Label size="NORMAL_SMALL" customColor="green" font="REGULAR">
                                    Stop green
                                </Label>
                                <NumericInput
                                    value={configuration.green}
                                    onDecrease={value => handleChangeInput("green", value)}
                                    onInscrease={value => handleChangeInput("green", value)}
                                    onChangeValue={value => handleChangeInput("green", value)}
                                    min={0}
                                />
                            </StopContent>
                            <StopContent>
                                <Label size="NORMAL_SMALL" customColor="red" font="REGULAR">
                                    Stop red
                                </Label>
                                <NumericInput
                                    value={configuration.red}
                                    onDecrease={value => handleChangeInput("red", value)}
                                    onInscrease={value => handleChangeInput("red", value)}
                                    onChangeValue={value => handleChangeInput("red", value)}
                                    min={0}

                                />
                            </StopContent>
                        </StopContainer>

                        <ValuesContainer>
                            <Label font="MEDIUM" size="NORMAL_SMALL" color="DEFAULT" >
                                Valor da aposta
                            </Label>
                            <ValueInput
                                value={configuration.amount.toString()}
                                onChangeText={text => handleChangeInput("amount", text)}
                            />
                        </ValuesContainer>
                    </>
                </Container>
            </TouchableWithoutFeedback>

            <Footer>
                <Button
                    color="DEFAULT"
                    labelProps={getLabelProps("Resetar contagem")}
                    styleProps={getButtonProps()}
                    activeOpacity={0.6}
                    onPress={handleResetCount}
                />
                <Button
                    color="SUCCESS"
                    labelProps={getLabelProps("Salvar")}
                    styleProps={getButtonProps()}
                    activeOpacity={0.7}
                    onPress={handlePressSave}
                />
            </Footer>

        </Modal>
    );
}