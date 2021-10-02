import React, {useState} from "react";
import {View, StyleSheet, TextInput, SafeAreaView, Pressable, Keyboard} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import FA from 'react-native-vector-icons/FontAwesome'

/***
 * Estilos utilizados por el componente HomeSearchBar
 * @type {{container: {alignItems: string, flexDirection: string, width: string, justifyContent: string, marginTop: number, height: number}, input: {padding: number, width: string, marginLeft: number}, icon: {marginRight: number, fontSize: number, marginLeft: number}, backButton: {marginRight: number, padding: number, backgroundColor: string, borderColor: string, alignItems: string, borderRadius: number, borderWidth: number, width: number, justifyContent: string, height: number, marginLeft: number}, section: {padding: number, backgroundColor: string, borderColor: string, alignItems: string, borderRadius: number, flexDirection: string, borderWidth: number, width: string, paddingHorizontal: number, justifyContent: string, height: number}}}
 */
const style = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 50,
        width: "80%",
        marginTop: 36,
    },
    section: {
        height: 50,
        width: "100%",
        backgroundColor: '#FFFFFF',
        justifyContent: 'flex-start',
        paddingHorizontal: 1,
        flexDirection: 'row',
        padding: 1,
        alignItems: "center",
        borderRadius: 7,
        borderColor: "#4A4A4A",
        borderWidth: 1,
    },
    icon: {
        marginLeft: 6,
        marginRight: 7,
        fontSize: 24,
    },
    input: {
        marginLeft: 5,
        padding: 5,
        width: "100%",
    },
    backButton: {
        height: 50,
        width: 50,
        backgroundColor: '#E7E7E7',
        justifyContent: 'center',
        padding: 1,
        alignItems: "center",
        borderRadius: 30,
        borderColor: "rgba(0, 0, 0, 0.25)",
        borderWidth: 1,
        marginRight: 3,
        marginLeft: 70,
    },
});

/***
 * Componente de la Barra de Busqueda de la Ventana Principal de la Aplicación
 * @returns {JSX.Element}
 * @constructor
 */
const HomeSearchBar = () => {
    const [data, setData] = useState("");
    const [onClick, setOnClick] = useState(false);

    const handleOnClick = ()  => {setOnClick(true)}

    const handleNotClick =  ()  => {
        setOnClick(false)
        setData("")
        Keyboard.dismiss()
    }

    return (
        <SafeAreaView style={onClick ? {} : style.onClick}>
            <View style={style.container}>
                {onClick &&
                    <Pressable style={style.backButton} onPressIn={handleNotClick}><FA name={"long-arrow-left"} style={style.icon}/></Pressable>
                }
                <View style={style.section}>
                    {!onClick &&  <Icon name={"ios-search"} style={style.icon} />}
                    <TextInput
                        style={style.input}
                        placeholder="Buscar"
                        //onPressIn={handleOnClick}
                        onFocus={handleOnClick}
                        onEndEditing={handleNotClick}
                        value={data}
                        onChangeText={setData}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeSearchBar;