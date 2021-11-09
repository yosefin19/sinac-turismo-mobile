import React, {useContext, useState} from "react";
import {Alert, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";
import {ActivityIndicator} from 'react-native-paper';
import Icon from "react-native-vector-icons/FontAwesome";

import {API_URL, FIRST_PERCENTAGE, SECRET} from "../config";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {CredentialsContext} from "../CredentialsContext";
import ConstantMenu from "../components/ConstantMenu";

const appStyles = require("../appStyle");


/***
 * Componente que representa el Login de la aplicación, es este se inicia sesión con las
 * credenciales correspondientes y se almacena el token que sera utilizado por el usuario
 * en otras secciones de la aplicación.
 * @param navigation Pila utilizada para el manejo de las pantallas de la aplicación
 * @returns {JSX.Element}
 */
const Login = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordValidated, setPasswordValidated] = useState(true)
    const [emailValidated, setEmailValidated] = useState(true)
    const [hidePassword, setHidePassword] = useState(false)
    const [loading, setLoading] = useState(false)

    /**
     * Con el uso de Async storage, se almacenan el token de un usuario con
     * credenciales validas.
     */
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);


    /**
     * Función utilizada para almacenar persistentemente el token
     * obtenido por parte del usuario y poder usarlo en otras secciones.
     * @param credentials token obtenido por el usuario.
     */
    const persistLogin = (credentials) => {
        AsyncStorage.setItem(SECRET, JSON.stringify(credentials))
            .then(() => {
                setStoredCredentials(credentials);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    /**
     * Función para verificar si se encuentra registrado en la base de datos
     * un usuario con una contraseña y correo en especifico, haciendo uso de
     * la funcionalidad de fetch.
     * @param email correo electrónico de un usuario.
     * @param password contraseña de dicho usuario.
     */
    const Login = (email, password) => {
        /**
         * se establecen los encabezados necesarios de la consulta
         * @type {{headers: {"Content-Type": string}, method: string, body: string}}
         */
        setLoading(true)
        const requestOptionsUser = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        };
        /**
         * se realiza la consulta fetch a la API de SINAC Turismo
         */
        fetch(`${API_URL}login`, requestOptionsUser)
            .then((response) => response.json())
            .then((data) => {
                if (data.token) {
                    const {token} = data;
                    persistLogin(token, "SUCCESS", 200);
                    setLoading(false)
                    navigation.goBack()
                } else {
                    if(data.detail === "User not found") {
                        //persistLogin(data, "FAILURE", 500);
                        Alert.alert(
                            "Error al iniciar sesión",
                            "El correo electrónico no corresponde a ningun usuario registrado",
                            [{
                                text: "Reintentar"
                            }]
                        );
                    }
                    else if (data.detail === "Email or Password not found"){
                        //persistLogin(data, "FAILURE", 500);
                        Alert.alert(
                            "Error al iniciar sesión",
                            "El correo electrónico o contraseña no coinciden, " +
                            "asegúrese de contar con los datos correctos",
                            [{
                                text: "Reintentar"
                            }]
                        );
                    }

                    setLoading(false)
                }
            });
    }

    /**
     * Verifica si un correo coincide con la expresión regular
     * @param email
     */
    const emailValidation = (email) => {
        let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
        return reg.test(email);
    }

    /**
     * Verifica que una contraseña tenga un largo dentro de 8 y 32 caracteres,
     * mayusculas, minusculas y números.
     * @param password
     */
    const passwordValidation = (password) => {
        const re = {
            'capital': /[A-Z]/,
            'digit': /[0-9]/,
            'full': /^[A-Za-z0-9]{7,13}$/
        };
        return password.length > 7 && password.length < 32 &&
            re.capital.test(password) && re.digit.test(password) && re.full.test(password);
    }


    /***
     * Función para validar los datos, hace la consulta con los datos del
     * usuario si estos son validos.
     */
    const handleLogin = () => {
        if (emailValidation(email) && passwordValidation(password)) {
            Login(email, password)
            setEmailValidated(true)
            setPasswordValidated(true)
        } else {
            setEmailValidated(false)
            setPasswordValidated(false)
        }
    };

    /**
     * Redirecciona a la sección de registro
     */
    const SignUp = () => {
        navigation.navigate('SignUp');
    };

    /**
     * Activa y desactiva la opción para visualizar la contraseña
     */
    const handleHidePassword = () => {
        setHidePassword(!hidePassword)
    }

    /**
     * Maneja los cambios en la entrada de correo electrónico
     * @param event
     */
    const handleEmailChange = (event) => {
        setEmail(event)
        setEmailValidated(emailValidation(email))
    }

    /**
     * Maneja los cambios en la entrada de la contraseña
     * @param event Contenido en el campo
     */
    const handlePasswordChange = (event) => {
        setPassword(event)
        setPasswordValidated(passwordValidation(password))
    }

    return (
        <SafeAreaView style={[styles.container, appStyles.default.appBackgroundColor]}>
            <Image style={styles.logo} source={require('../../assets/menu-icon.png')}/>
            <View style={styles.section}>
                <View style={styles.form}>
                    <Icon style={{marginLeft: 6, marginRight: 6}} name="envelope" size={24} color={"#CACACA"}/>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        placeholder="Correo electrónico"
                        secureTextEntry={false}
                        onChangeText={handleEmailChange}
                        value={email}
                    />
                </View>
            </View>
            {!emailValidated && <Text style={styles.error_msg}>Formato invalido de correo electrónico</Text>}
            <View style={styles.section}>
                <View style={styles.form}>
                    <Icon style={{marginLeft: 8, marginRight: 8}} name="lock" size={28} color={"#CACACA"}/>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        placeholder="Contraseña"
                        secureTextEntry={!hidePassword}
                        onChangeText={handlePasswordChange}
                        value={password}
                    />
                </View>
                <Pressable style={{marginLeft: "10%"}} onPress={handleHidePassword}>
                    <Icon name={hidePassword ? "eye" : "eye-slash"} size={24} color={"#CACACA"}/>
                </Pressable>
            </View>
            {!passwordValidated &&
            <Text style={styles.error_msg}>Contraseña incorrecta, debe contener: mayusculas, minusculas y
                números</Text>}
            <View style={styles.leftText}>
                <Pressable onPress={() => {
                    navigation.navigate("ResetPassword");
                }}>
                    <Text style={{textAlign: "right", color: "#605f5f"}}> ¿Olvidó su contraseña?</Text>
                </Pressable>
            </View>
            <Pressable style={styles.submit} onPress={handleLogin} disable={!loading}>
                {loading ?
                    <ActivityIndicator animating={true} color={"#4A4A4A"}/>
                    : <Text style={styles.submit_text}>Ingresar</Text>}
            </Pressable>
            <View style={styles.register}>
                <Text style={styles.register_text}>¿No tiene cuenta?</Text>
                <Pressable style={styles.register_button} onPress={SignUp}>
                    <Text style={styles.register_button_text}>Registrar</Text>
                </Pressable>
            </View>
            <View style={{
                alignItems: "center",
                justifyContent: "center",
                flex: FIRST_PERCENTAGE,
                width: "100%",
            }}>
                <ConstantMenu navigation={navigation}/>
            </View>
        </SafeAreaView>
    );
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 70,
        width: 120,
        resizeMode: "stretch",
        backgroundColor: "transparent",
        marginTop: "20%",
        marginBottom: '15%',
    },
    section: {
        alignItems: 'center',
        flexDirection: 'row',
        width: "80%",
        height: 50,
        borderWidth: 0.7,
        borderColor: "#C4C4C4",
        borderRadius: 7,
        marginTop: "8%",
    },
    form: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: "80%",
        flexDirection: 'row',
        fontFamily: "Segoe UI",
        fontStyle: 'normal',
        fontSize: 13,
        lineHeight: 17,
        color: "rgba(127, 127, 127, 0.25)",
    },
    input: {
        width: '100%',
        fontSize: 13,
        lineHeight: 17,
        color: "#7F7F7F",
    },
    leftText: {
        width: "80%",
        marginTop: 10,
        fontFamily: "Segoe UI",
        fontStyle: 'normal',
    },
    submit: {
        borderRadius: 4,
        backgroundColor: "rgba(118, 159, 94, 0.6)",
        width: "30%",
        height: 50,
        alignItems: 'center',
        justifyContent: "center",
        marginTop: "10%",
    },
    submit_text: {
        color: "#4A4A4A",
        fontSize: 18,
        fontWeight: "bold",
        lineHeight: 18,
    },
    register: {
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: "row",
        marginTop: "10%",
        marginBottom: "38%",
    },
    register_text: {
        color: "#605F5F",
        fontFamily: "Segoe UI",
        fontStyle: 'normal',
        fontWeight: "normal",
        paddingRight: 5,
    },
    register_button: {
        borderRadius: 4,
        backgroundColor: "rgba(118, 159, 94, 0.6)",
        width: "20%",
        padding: 6,
        alignItems: 'center',
        justifyContent: "center",
    },
    register_button_text: {
        color: "#4A4A4A",
        fontFamily: "Segoe UI",
        fontWeight: "bold",
    },
    error_msg: {
        color: "#D8000C",
        width: "80%",
        fontFamily: "Segoe UI",
        fontStyle: 'normal',
        fontWeight: "normal",
        textAlign: "center"
    }
});
export default Login;
