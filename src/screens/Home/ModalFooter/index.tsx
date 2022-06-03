import React, { useRef } from "react";
import { Container, Header, Modal, Title, StopInput, StopContainer, StopContent, ValuesContainer, ValueInput } from "./styles";
import BottomSheet from "@gorhom/bottom-sheet";
import { Label } from "../../../components/Label";
import { Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";

interface HomeModalFooterProps {
    modalRef?: React.MutableRefObject<any>
}

export const HomeModalFooter: React.FC<HomeModalFooterProps> = ({ modalRef }) => {
    const innerRef = modalRef ? modalRef : useRef<BottomSheet>(null);
    return (
        <Modal
            ref={innerRef}
            index={0}
            snapPoints={['5.5%', '90%']}

        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <Container>
                    <>
                        <Header>
                            <Title>Configurações</Title>
                        </Header>

                        <StopContainer>
                            <StopContent>
                                <Label size="NORMAL_SMALL" customColor="green" font="REGULAR">
                                    Stop green
                                </Label>
                                <StopInput keyboardType="number-pad" type="green" defaultValue="0" />
                            </StopContent>
                            <StopContent>
                                <Label size="NORMAL_SMALL" customColor="red" font="REGULAR">
                                    Stop red
                                </Label>
                                <StopInput keyboardType="number-pad" type="red" defaultValue="0" />
                            </StopContent>
                        </StopContainer>

                        <ValuesContainer>
                            <Label font="MEDIUM" size="NORMAL_SMALL" color="DEFAULT" >
                                Valor da aposta
                            </Label>
                            <ValueInput
                                keyboardType="numeric"
                                autoCapitalize="none"
                                autoCorrect={false}
                                autoCompleteType="off"
                            />
                        </ValuesContainer>
                    </>
                </Container>
            </TouchableWithoutFeedback>
            <TouchableOpacity>
                <Text>Resetar dados</Text>
            </TouchableOpacity>

        </Modal>
    );
}