import React from "react";
import MainStack from "./src/navigation/MainStack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, StatusBar } from "react-native";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

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
  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer style={styles.container}>
      <StatusBar style="auto" />
      <MainStack />
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

