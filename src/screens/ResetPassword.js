import React, {useState} from "react";
import {Alert, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";
import {styles} from "./Login";
import Icon from "react-native-vector-icons/FontAwesome";
import {ActivityIndicator} from "react-native-paper";
import Exit from "../images/exit.png";
import {API_URL} from "../config";
const appStyles = require("../appStyle");

/**
 * Componente encargado de representar la pantalla de cambio de contraseña.
 * @param navigation
 * @returns {JSX.Element}
 * @constructor
 */
const ResetPassword = ({navigation}) => {

    const [profile, setProfile] = useState(null);
    const [email, setEmail] = useState("");
    const [emailValidated, setEmailValidated] = useState(true);
    const [phone, setPhone] = useState("");
    const [phoneValidated, setPhoneValidated] = useState(true);
    const [loading, setLoading] = useState(false);
    const [existUser, setExistUser] = useState(false);
    /**
     * Verifica si un correo coincide con la expresión regular, en tal caso es un correo valido.
     */
    const emailValidation = () => {
        let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
        return reg.test(email);
    }

    /**
     * Verifica si un número de teléfono es igual al registrado por el usuario.
     */
    const phoneValidation = () => {
        return profile && (profile.phone === phone);
    }

    /**
     * Función que actualiza el valor de email con el que se ingresa por el usuario
     * @param event nuevo valor del input
     */
    const handleEmailChange = (event) => {
        setEmail(event)
        setExistUser(false)
        setProfile(null)
        setEmailValidated(emailValidation())
    }

    /**
     * Función que actualiza el valor del teléfono (phone) con el que se ingresa por el usuario
     * @param event nuevo valor del input
     */
    const handlePhoneChange = (event) => {
        setPhone(event)
        setPhoneValidated(phoneValidation())
    }

    /**
     * Función que se encarga de realizar la consulta a la API sobre si existe o no un usuario con
     * el correo proporsionado por el usuario. Si el usuario es valido le permite cambiar de contraseña,
     * sino le muestra un mensaje de error.
     */
    function findUser() {
        setLoading(true);
        let endPoint = `${API_URL}find-user`;
        let options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: email,
                password: '',
            }),
        }
        fetch(endPoint, options)
            .then((response) => response.json())
            .then((data) => {
                if (data.phone) {
                    setProfile(data);
                    setExistUser(true);
                }
                else {
                    Alert.alert(
                        "Error al buscar el usuario",
                        "El correo electrónico no corresponde a ningun usuario registrado",
                        [{
                            text: "Reintentar"
                        }]
                    );
                }
            });
        setLoading(false);
        return false;
    }

    /**
     * Función que se encarga se realizar la consulta a la API para que se realice el cambio de contraseña.
     * Si se realiza sin problema muestra un mensaje de exito, sino muestra uno de error.
     */
    function changePassword() {
        setLoading(true);
        let endPoint = `${API_URL}reset-password`;
        let options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: email,
                password: '',
            }),
        }
        fetch(endPoint, options)
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    Alert.alert(
                        "Exito",
                        `Se ha cambiado la contraseña, se ha envíado un correo a ${email}.\n` +
                        "Recuerde que puede cambiar su contraseña desde la sección de Perfil en la opción de modificar.",
                        [{
                            text: "Listo"
                        }]
                    );
                    setLoading(false);
                    navigation.navigate("Login");
                }
                else {
                    Alert.alert(
                        "Error al cambiar la contraseñá",
                        "El correo electrónico no corresponde a ningun usuario registrado",
                        [{
                            text: "Reintentar"
                        }]
                    );
                    setLoading(false);
                }
            });
    }

    /**
     * Función que valida que el correo sea correcto para buscar el usuario,
     * si es correcto lo busca, sino no procede hasta que sea correcto
     */
    function handleFindUser() {
        if (emailValidation()){
            setEmailValidated(true);
            findUser()
        }
        setEmailValidated(emailValidation())
    }

    /**
     * Función que valida que el correo sea correcto y el número de teléfono del usuario
     * conincida con el registrado en el sistema, para proceder a cambiar la contraseña.
     * si es correcto lo busca, sino no procede hasta que sea correcto.
     */
    function handleChangePassword() {
        if (emailValidation() && phoneValidation()){
            setEmailValidated(true);
            setPhoneValidated(true);
            changePassword()
        }
        setEmailValidated(emailValidation())
        setPhoneValidated(phoneValidation())
    }

    return (
        <SafeAreaView style={[styles.container, appStyles.default.appBackgroundColor]}>
            <Pressable
                onPress={() => navigation.goBack()}
                style={[appStyles.default.exitView, { elevation: 31 }]}
            >
                <Image style={appStyles.default.exitImage} source={Exit} />
            </Pressable>
            <Image style={currentStyles.logo} source={require('../../assets/menu-icon.png')}/>
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
            {existUser ? (
                <View style={styles.section}>
                    <View style={styles.form}>
                        <Icon style={{marginLeft: 6, marginRight: 6}} name="phone" size={24} color={"#CACACA"}/>
                        <TextInput
                            style={styles.input}
                            keyboardType="phone-pad"
                            autoCapitalize="none"
                            placeholder={`Telefonó asociado: ${profile.phone.substr(0, 2)}####${profile.phone.slice(-2)}`}
                            secureTextEntry={false}
                            onChangeText={handlePhoneChange}
                            value={phone}
                        />
                    </View>

                </View>
            ) : (
                <Text>
                    Utilice un correo registrado en el sistema.
                </Text>
            )}
            {!phoneValidated && <Text style={styles.error_msg}>Formato invalido de correo electrónico</Text>}
            <Pressable
                style={currentStyles.submit}
                onPress={existUser ? handleChangePassword : handleFindUser}
                disabled={loading}
            >
                {loading ? (
                    <Text style={currentStyles.submit_text}>
                        {existUser ? "Cambiando Contraseña..." : "Buscando Usuario..."}
                        <ActivityIndicator animating={true} color={"#4A4A4A"}/>
                    </Text>

                    ) : (
                        <Text style={currentStyles.submit_text}>
                            {existUser ? "Cambiar Contraseña" : "Buscar Usuario"}
                        </Text>
                )}
            </Pressable>
        </SafeAreaView>
    );
}

/**
 * Estilos útilizados en este componente
 * @type {{submit: {backgroundColor: string, borderRadius: number, alignItems: string, width: string, justifyContent: string, marginTop: string, height: number}, submit_text: {marginRight: string, color: string, fontSize: number, lineHeight: number, fontWeight: string, marginLeft: string}, logo: {backgroundColor: string, width: number, marginBottom: string, resizeMode: string, height: number}}}
 */
export const currentStyles = StyleSheet.create({
    logo: {
        height: 70,
        width: 120,
        resizeMode: "stretch",
        backgroundColor: "transparent",
        marginBottom: '15%',
    },
    submit: {
        borderRadius: 4,
        backgroundColor: "rgba(118, 159, 94, 0.6)",
        width: "auto",
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
        marginRight: "3%",
        marginLeft: "3%",
    },
});

export default ResetPassword;