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
import Empty from "../images/empty_white_star.png";
import Filled from "../images/filled_white_star.png";
import Half from "../images/half_white_star.png";

// Configuración
import {
  DESTINATIONS_IMAGE_WIDTH,
  DESTINATIONS_IMAGE_HEIGHT,
  IMAGE_IN_LIST_PERCENTAGE,
} from "../config";
import Stars from "./Stars";

// Estilos globales
const appStyles = require("../appStyle");

// Ancho de la imagen a desplegar
const image_width = Dimensions.get("window").width * IMAGE_IN_LIST_PERCENTAGE;

/***
 * Imagen y nombre de un destino presente en un área de conservación
 * @param name nombre que se mostrara en al parte inferior de la tarjetas
 * @param imageUrl Dirección de la imagen
 * @param isDestination booleano para saber si la tarjeta corresponde a un destino y agregar la calificación
 * @returns {JSX.Element}
 */
const ViewImageInformation = ({ name, imageUrl, isDestination }) => (
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
      {!isDestination? null :
          <View style={styles.starts}>
              <Stars reviewAverage={4.5} emptyStar={Empty} halfStar={Half} filledStar={Filled}/>
          </View>
      }
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
    starts: {
        position: "absolute",

        width: 31,
        height: 31,

        left: 22,
        top: 9,
        alignItems: "center",
        justifyContent: "center",
    }
});

export default ViewImageInformation;
