import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
} from "react-native";
import HomeSearchBar from "../components/HomeSearchBar";
import HomeButton from "../components/HomeButton";
import React, { useState, useEffect, useContext } from "react";
import OpenURLButton from "../components/OpenURLButton";
// Autenticación
import { CredentialsContext } from "../CredentialsContext";
import { API_URL, SECRET } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const appStyles = require("../appStyle");

/***
 * Pantalla del Menú Principa de la Aplicación.
 * @param navigation Pila para el manejo de Ventanas
 * @returns {JSX.Element}
 */
const Home = ({navigation}) => {
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

    return (
        <SafeAreaView
            style={[styles.container, appStyles.default.appBackgroundColor]}
        >
            <Image
                style={styles.logo}
                source={require("../../assets/menu-icon.png")}
            />
            <HomeSearchBar/>
            <HomeButton
                title="Destinos de Costa Rica"
                to="InformationSection"
                navigation={navigation}
            />
            <OpenURLButton
                url={"https://serviciosenlinea.sinac.go.cr/"}
                text="Compra y Reserva"
            >
                Open Supported URL
            </OpenURLButton>
            <HomeButton title="Mi Perfil" to={storedCredentials ? "MyProfile" : "Login"} navigation={navigation}/>
            <Pressable
                style={styles.aboutButton}
                onPress={() => {
                    navigation.navigate("About");
                }}
            >
                <Text style={styles.aboutText}>Conozcanos</Text>
            </Pressable>
        </SafeAreaView>
    );
};

/***
 * Estilos utilizados en el componente de Home.
 * @type {{container: {alignItems: string, flex: number, justifyContent: string}, logo: {backgroundColor: string, width: number, marginBottom: number, resizeMode: string, height: number}, aboutButton: {borderBottomColor: string, paddingVertical: number, backgroundColor: string, borderRadius: number, paddingHorizontal: number, shadowOpacity: number, shadowColor: string, marginTop: number}, aboutText: {color: string, textAlign: string, letterSpacing: number, fontSize: number, lineHeight: number, fontStyle: string, fontWeight: string}}}
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 70,
    width: 120,
    resizeMode: "stretch",
    backgroundColor: "transparent",
    marginBottom: 36,
  },
    aboutText: {
        fontStyle: "normal",
        fontSize: 12,
        lineHeight: 16,
        textAlign: "center",
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "rgba(0, 0, 0, 0.6)",
    },
    aboutButton: {
        backgroundColor: "#E1EAD9",
        marginTop: 53,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOpacity: 3,
        borderRadius: 20,
        borderBottomColor: "#000",
        paddingVertical: 6,
        paddingHorizontal: 60,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 4.65,

        elevation: 5,
    },
});
export default Home;
