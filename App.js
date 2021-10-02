import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet} from 'react-native';

import MainStack from "./src/navigation/MainStack";
import {NavigationContainer} from "@react-navigation/native";

/***
 * Componente principal de la aplicación
 * @returns {JSX.Element}
 */
export default function App() {

    /*  Para cargar tipografias -> da error en android, en Iphone no
        const [loaded] = useFonts({
        SegoeUI: require('./assets/fonts/Segoe UI.ttf'),
        SegoeUIBold: require('./assets/fonts/Segoe UI Bold.ttf'),
        SegoeUIItalic: require('./assets/fonts/Segoe UI Italic.ttf'),
        SegoeUIBoldItalic: require('./assets/fonts/Segoe UI Bold Italic.ttf'),
    });*/


    return (
        <NavigationContainer style={styles.container}>
            <StatusBar style="auto" />
            <MainStack/>
        </NavigationContainer>
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
    }
);
