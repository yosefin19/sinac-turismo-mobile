import React, {useState} from "react";
import MainStack from "./src/navigation/MainStack";
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar, StyleSheet} from "react-native";

import {SECRET} from "./src/config.js";

import AppLoading from "expo-app-loading";
import {useFonts} from "expo-font";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {CredentialsContext} from "./src/CredentialsContext";

/***
 * Componente principal de la aplicación
 * @returns {JSX.Element}
 */
export default function App() {
    const [loaded] = useFonts({
        "Segoe UI": require("./assets/fonts/SegoeUI.ttf"),
        "Segoe UI Bold": require("./assets/fonts/SegoeUIBold.ttf"),
        "Segoe UI Italic": require("./assets/fonts/SegoeUIItalic.ttf"),
        "Segoe UI Bold Italic": require("./assets/fonts/SegoeUIBoldItalic.ttf"),
    });
    const [appReady, setAppReady] = useState(false);

    const [storedCredentials, setStoredCredentials] = useState("");

    const checkLoginCredentials = () => {
        AsyncStorage.getItem(SECRET)
            .then((result) => {
                if (result !== null) {
                    setStoredCredentials(JSON.parse(result));
                } else {
                    setStoredCredentials(null);
                }
            })
            .catch((error) => console.log(error));
    };

    if (!appReady) {
        return (
            <AppLoading
                startAsync={checkLoginCredentials}
                onFinish={() => setAppReady(true)}
                onError={console.warn}
            />
        );
    }

    return (
        <CredentialsContext.Provider
            value={{storedCredentials, setStoredCredentials}}
        >
            <NavigationContainer style={styles.container}>
                <StatusBar style="auto"/>
                <MainStack/>
            </NavigationContainer>
        </CredentialsContext.Provider>
    );
}
/***
 * Estilos del componente App
 * @type {{container: {backgroundColor: string, alignItems: string, flex: number, width: string, justifyContent: string, height: string}}}
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: '#F0F0F0',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
