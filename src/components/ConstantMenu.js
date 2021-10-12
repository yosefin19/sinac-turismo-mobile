import React from "react";
import { View, StyleSheet } from "react-native";

// Imagenes
import Home from "../images/home.png";
import Favorite from "../images/favorite.png";
import Person from "../images/person.png";

// Componentes
import Icon from "./Icon";

// Estilos globales
const appStyles = require("../appStyle");

/***
 * Menú constante en el pie de las secciones
 * @returns {JSX.Element}
 */
const ConstantMenu = () => (
  <View style={styles.container}>
    <View style={appStyles.default.horizontalLine} />
    <View style={styles.horizontalContainer}>
      <Icon text="inicio" imageUrl={Home} width={19.65} height={20.72} />
      <Icon text="favoritos" imageUrl={Favorite} width={21.49} height={19.72} />
      <Icon text="perfil" imageUrl={Person} width={23.33} height={23.33} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    top: -10,
    marginHorizontal: 20,
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "flex-start",
  },
  horizontalContainer: {
    top: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default ConstantMenu;
