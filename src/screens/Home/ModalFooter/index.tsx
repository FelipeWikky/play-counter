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
        clearCounter,
        configuration, handleChangeConfiguration
    } = useCounter();

    const [localConfiguration, setLocalConfiguration] = useState(configuration);

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

    const handleChangeInput = useCallback((key: keyof typeof localConfiguration, value: string | number) => {
        setLocalConfiguration(prev => ({
            ...prev,
            [key]: (String(value) && String(value).trim()) ? Number(value) : ""
        }))
    }, []);

    const handlePressSave = useCallback(() => {
        handleChangeConfiguration(localConfiguration)
        innerRef?.current?.collapse()
    }, [localConfiguration, handleChangeConfiguration]);

    const handleResetCount = useCallback(async () => {
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
                    onPress: async () => {
                        const reseted = await clearCounter();
                        if (reseted) {
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
                                    value={localConfiguration.stopGreen}
                                    onDecrease={value => handleChangeInput("stopGreen", value)}
                                    onInscrease={value => handleChangeInput("stopGreen", value)}
                                    onChangeValue={value => handleChangeInput("stopGreen", value)}
                                    min={0}
                                />
                            </StopContent>
                            <StopContent>
                                <Label size="NORMAL_SMALL" customColor="red" font="REGULAR">
                                    Stop red
                                </Label>
                                <NumericInput
                                    value={localConfiguration.stopRed}
                                    onDecrease={value => handleChangeInput("stopRed", value)}
                                    onInscrease={value => handleChangeInput("stopRed", value)}
                                    onChangeValue={value => handleChangeInput("stopRed", value)}
                                    min={0}

                                />
                            </StopContent>
                        </StopContainer>

                        <ValuesContainer>
                            <Label font="MEDIUM" size="NORMAL_SMALL" color="DEFAULT" >
                                Valor da aposta
                            </Label>
                            <ValueInput
                                value={localConfiguration.betAmount.toString()}
                                onChangeText={text => handleChangeInput("betAmount", text)}
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