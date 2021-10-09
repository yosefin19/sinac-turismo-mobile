import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";

// Imagenes
import Exit from "../images/exit.png";

// Configuración
import {
  IMAGE_BASE_URL,
  REGION_IMAGE_WIDTH,
  REGION_IMAGE_HEIGHT,
} from "../config";

// Estilos globales
const appStyles = require("../appStyle");

// Dimensiones de la imagen
const image_height = Dimensions.get("window").height;
const image_width =
  REGION_IMAGE_WIDTH * (Dimensions.get("window").height / REGION_IMAGE_HEIGHT);

/***
 * Imagen de las que existen de un destino turístico
 * @param route
 * @returns {JSX.Element}
 */
const Region = ({ route }) => {
  const { imageUrl } = route.params;
  return (
    <SafeAreaView style={[styles.safeContainer]}>
      <View style={styles.container}>
        <ScrollView>
          <ScrollView horizontal={true}>
            <Image
              style={styles.region}
              source={{
                width: REGION_IMAGE_WIDTH,
                height: REGION_IMAGE_HEIGHT,
                uri: `${IMAGE_BASE_URL}${imageUrl}`,
              }}
            />
          </ScrollView>
        </ScrollView>
      </View>
      <View style={appStyles.default.exitView}>
        <Image style={appStyles.default.exitImage} source={Exit} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  container: {
    height: "100%",
    position: "absolute",
    left: 0,
    top: StatusBar.currentHeight,
    width: "100%",
    overflow: "hidden",
  },
  region: {
    resizeMode: "contain",
    width: image_width,
    height: image_height,
  },
});

export default Region;
