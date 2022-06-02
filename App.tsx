import { StatusBar } from "expo-status-bar";
import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { ThemeProvider } from "styled-components/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { THEME } from "./src/theme";

import { HomeScreen } from "./src/screens/Home";

const AppWrapper = () => {

    return (
        <ThemeProvider theme={THEME}>
            <SafeAreaView>
                <HomeScreen />
            </SafeAreaView>
            <StatusBar style={"auto"} backgroundColor={THEME.COLORS.BACKGROUND} networkActivityIndicatorVisible translucent />
        </ThemeProvider >
    );
}

export default function App() {

    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
            <SafeAreaProvider>
                <AppWrapper />
            </SafeAreaProvider>
    );
}