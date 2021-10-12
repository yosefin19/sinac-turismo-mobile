import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

// Estilos globales
const appStyles = require("../appStyle");

/***
 * Icono presente en el menu constante
 * @param text Texto debajo del icono
 * @param imageUrl Dirección de la imagen del icono
 * @param width Ancho de la imagen
 * @param height Largo de la imagen
 * @returns {JSX.Element}
 */
const Icon = ({ text, imageUrl, width, height }) => (
  <View style={styles.container}>
    <Image
      style={[{ width: width }, { height: height }]}
      source={imageUrl}
      alt="Icon"
    />
    <Text style={[styles.iconText, appStyles.default.defaultFont]}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  iconText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 9,
    lineHeight: 12,
    textAlign: "center",

    color: "#7f7f7f",
  },
});

export default Icon;
