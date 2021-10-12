import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";

// Imagenes
import Favorite from "../images/favorite.png";

// Configuración
import {
  DESTINATIONS_IMAGE_WIDTH,
  DESTINATIONS_IMAGE_HEIGHT,
  IMAGE_IN_LIST_PERCENTAGE,
} from "../config";

// Estilos globales
const appStyles = require("../appStyle");

// Ancho de la imagen a desplegar
const image_width = Dimensions.get("window").width * IMAGE_IN_LIST_PERCENTAGE;

/***
 * Imagen y nombre de un destino presente en un área de conservación
 * @param imageUrl Dirección de la imagen
 * @returns {JSX.Element}
 */
const ViewImageInformation = ({ name, imageUrl }) => (
  <View style={[styles.container]}>
    <Image
      style={[styles.image]}
      source={{
        width: DESTINATIONS_IMAGE_WIDTH,
        height: DESTINATIONS_IMAGE_HEIGHT,
        uri: imageUrl,
      }}
    />
    <View style={appStyles.default.favoriteView}>
      <Image style={appStyles.default.favoriteImage} source={Favorite} />
    </View>
    <View
      style={[
        styles.nameView,
        Platform.OS === "android"
          ? appStyles.default.androidShadowBox
          : appStyles.default.iosShadowBox,
      ]}
    >
      <Text style={[styles.name, appStyles.default.defaultFont]}>{name}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: image_width,

    marginHorizontal: 10,
  },
  nameView: {
    position: "absolute",
    borderRadius: 7,
    backgroundColor: "#769F5E",
    height: 41,
    width: "103%",
    bottom: 8,
    right: -3,
    padding: 3,
  },
  name: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 16,

    color: "#383837",
  },
  image: {
    width: "100%",
    height: "90%",
    resizeMode: "stretch",
    borderRadius: 7,
  },
});

export default ViewImageInformation;
