import React, { useContext } from "react";
import { View, Pressable, StyleSheet } from "react-native";

// Imagenes
import Home from "../images/home.png";
import Favorite from "../images/favorite.png";
import Person from "../images/person.png";

// Componentes
import Icon from "./Icon";

// Estilos globales
const appStyles = require("../appStyle");

// Autenticación
import { CredentialsContext } from "../CredentialsContext";

/***
 * Menú constante en el pie de las secciones
 * @returns {JSX.Element}
 */
const ConstantMenu = ({ navigation }) => {
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  return (
    <View style={styles.container}>
      <View style={appStyles.default.horizontalLine} />
      <View style={styles.horizontalContainer}>
      <Pressable
          onPress={() => {navigation.navigate("Home");}}
        >
        <Icon text="inicio" imageUrl={Home} width={19.65} height={20.72} />
        </Pressable>
        <Pressable
          onPress={() => {
            storedCredentials !== null
              ? navigation.navigate("Favorites")
              : navigation.navigate("Login");
          }}
        >
          <Icon
            text="favoritos"
            imageUrl={Favorite}
            width={21.49}
            height={19.72}
          />
          
        </Pressable>

        <Pressable
          onPress={() => {
            storedCredentials !== null
              ? navigation.navigate("MyProfile")
              : navigation.navigate("Login");
          }}
        >
        <Icon text="perfil" imageUrl={Person} width={23.33} height={23.33} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: -5,
    marginHorizontal: 20,
    marginBottom: -10,
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    backgroundColor: "#F0F0F0",
  },
  horizontalContainer: {
    top: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default ConstantMenu;

