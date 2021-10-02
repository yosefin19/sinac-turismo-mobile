import {Pressable, StyleSheet, Text} from "react-native";
import React from "react";

/***
 * Estilos utilizados en el componente HomeButton
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

/***
 * Componente de los botones de redicción presentes en la ventana principal.
 * @param title Texto que se muestra en el componente
 * @param to Nombre de la ventana a la que se redirecciona
 * @param navigation Pila de ventanas de la aplicación
 * @param route Objeto para el paso de datos entre ventanas
 * @returns {JSX.Element}
 */
const HomeButton = ({title, to, navigation, route}) => {

    const handleClick = () => {
        navigation.navigate(to, route)
    };
    return(
        <Pressable style={styles.button} onPress ={handleClick}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

export default HomeButton;