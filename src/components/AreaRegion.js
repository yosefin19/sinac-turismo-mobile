import React from "react";

import { Image, View, StyleSheet, Platform, Pressable } from "react-native";

// Imagenes
import Arrow from "../images/arrow.png";
import NoImage from "../images/no_image.png";

// Configuración
import {
  IMAGE_BASE_URL,
  AREAS_IMAGE_WIDTH,
  AREAS_IMAGE_HEIGHT,
} from "../config";

// Estilos globales
const appStyles = require("../appStyle");

/***
 * Imagen de la región del área de conservación
 * @param imageUrl Dirección de la imagen
 * @param navigation Pila para el manejo de ventanas
 * @returns {JSX.Element}
 */
const AreaRegion = ({ imageUrl, navigation }) => (
  <View
    style={[
      styles.container,
      Platform.OS === "android"
        ? appStyles.default.androidShadowBox
        : appStyles.default.iosShadowBox,
    ]}
  >
    <Image
      style={styles.region}
      source={
        imageUrl
          ? {
              width: AREAS_IMAGE_WIDTH,
              height: AREAS_IMAGE_HEIGHT,
              uri: `${IMAGE_BASE_URL}${imageUrl}`,
            }
          : NoImage
      }
    />
    <Pressable
      onPress={() => {
        navigation.push("Region", { imageUrl: imageUrl });
      }}
      style={appStyles.default.arrowView}
    >
      <Image style={appStyles.default.arrow} source={Arrow} />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#000",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  region: {
    resizeMode: "stretch",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    width: "100%",
    height: "100%",
  },
});

export default AreaRegion;
