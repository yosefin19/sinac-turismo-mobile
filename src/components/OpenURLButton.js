import {Alert, Linking, Pressable, StyleSheet, Text} from "react-native";
import React, {useCallback} from "react";

/***
 * Estilos utilizados en el componente OpenURLButton
 * @type {{button: {paddingVertical: number, backgroundColor: string, alignItems: string, borderRadius: number, width: string, justifyContent: string, marginTop: number}, text: {color: string, letterSpacing: number, fontSize: number, lineHeight: number, fontWeight: string}}}
 */
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 25,
        width: "80%",
        marginTop: 60,
        borderRadius: 7,
        backgroundColor: 'rgba(118, 159, 94, 0.5)',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'rgba(74, 74, 74, 0.6)',
    },
});

/**
 * Componente utilizado para crear Botones personalizados que redirección a una URL asociada
 * a otra aplicación.
 * @param url Dirección que se desea abrir
 * @param children Componente hijo donde se ejecuta el evento
 * @param text Texto que se mostrara en el boton.
 * @returns {JSX.Element}
 * https://reactnative.dev/docs/linking
 */
const OpenURLButton = ({ url, children, text }) => {

    const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert("Error",`No se puede abrir la dirección URL: ${url}`);
        }
    }, [url]);

    return (
        <Pressable title={children} style={styles.button} onPress = {handlePress}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
};

export default OpenURLButton;