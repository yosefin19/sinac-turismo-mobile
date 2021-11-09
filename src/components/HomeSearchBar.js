import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Pressable,
  Keyboard,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import FA from "react-native-vector-icons/FontAwesome";

/***
 * Estilos utilizados por el componente HomeSearchBar
 * @type {{container: {alignItems: string, flexDirection: string, width: string, justifyContent: string, marginTop: number, height: number}, input: {padding: number, width: string, marginLeft: number}, icon: {marginRight: number, fontSize: number, marginLeft: number}, backButton: {marginRight: number, padding: number, backgroundColor: string, borderColor: string, alignItems: string, borderRadius: number, borderWidth: number, width: number, justifyContent: string, height: number, marginLeft: number}, section: {padding: number, backgroundColor: string, borderColor: string, alignItems: string, borderRadius: number, flexDirection: string, borderWidth: number, width: string, paddingHorizontal: number, justifyContent: string, height: number}}}
 */
const style = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 50,
    width: "80%",
    marginTop: 36,
  },
  section: {
    height: 50,
    width: "100%",
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-start",
    paddingHorizontal: 1,
    flexDirection: "row",
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
    backgroundColor: "#E7E7E7",
    justifyContent: "center",
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
 * @param setSearchTerm Funcion que se ejecuta al cambiar el valor del input
 * @returns {JSX.Element}
 * @constructor
 */
const HomeSearchBar = ({ setSearchTerm }) => {
  const [state, setState] = useState("");
  const [onClick, setOnClick] = useState(false);
  const initial = useRef(true);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setState("");
      setOnClick(false);
    }
  }, [isFocused]);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 500);

    return () => clearTimeout(timer);
  }, [setSearchTerm, state]);

  const handleOnClick = () => {
    setOnClick(true);
  };

  const handleNotClick = () => {
    setOnClick(false);
    Keyboard.dismiss();
  };

  const handleExitClick = () => {
    setOnClick(false);
    setState("");
    setSearchTerm("");
    Keyboard.dismiss();
  };

  return (
    <View
      style={{
        width: "100%",
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={style.container}>
        {onClick && (
          <Pressable style={style.backButton} onPressIn={handleExitClick}>
            <FA name={"long-arrow-left"} style={style.icon} />
          </Pressable>
        )}
        <View style={style.section}>
          {!onClick && <Icon name={"ios-search"} style={style.icon} />}
          <TextInput
            style={style.input}
            placeholder="Buscar"
            onFocus={handleOnClick}
            onEndEditing={handleNotClick}
            value={state}
            onChangeText={setState}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeSearchBar;
