import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

// Imagenes
import No_favorite from "../images/empty_heart.png";
import Seen from "../images/seen.png";

// Configuración
import {
  DESTINATIONS_IMAGE_WIDTH,
  DESTINATIONS_IMAGE_HEIGHT,
  FIRST_PERCENTAGE,
} from "../config";

// Estilos globales
const appStyles = require("../appStyle");

// Dimensiones de la imagen
const image_height = Dimensions.get("window").height * FIRST_PERCENTAGE;
const image_width = Dimensions.get("window").width;

/***
 * Imagen de las que existen de un destino turístico
 * @param imageUrl Dirección de la imagen
 * @returns {JSX.Element}
 */
const DestinationViewImage = ({ imageUrl }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          width: DESTINATIONS_IMAGE_WIDTH,
          height: DESTINATIONS_IMAGE_HEIGHT,
          uri: imageUrl,
        }}
      />
      <View style={appStyles.default.favoriteView}>
        <Image style={appStyles.default.favoriteImage} source={No_favorite} />
      </View>
      <View style={appStyles.default.seenView}>
        <Image style={appStyles.default.seenImage} source={Seen} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    height: image_height,
    width: image_width,
  },
  image: {
    resizeMode: "stretch",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    width: "100%",
    height: "100%",
  },
});

export default DestinationViewImage;