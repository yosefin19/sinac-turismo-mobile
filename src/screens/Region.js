import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Pressable,
  SafeAreaView,
  Dimensions,
} from "react-native";

// Imagenes
import Exit from "../images/exit.png";
import NoImage from "../images/no_image.png";

// Configuración
import {
  IMAGE_BASE_URL,
  REGION_IMAGE_WIDTH,
  REGION_IMAGE_HEIGHT,
} from "../config";

// Estilos globales
const appStyles = require("../appStyle");

// Dimensiones de la imagen
const image_width = Dimensions.get("window").width;

/***
 * Imagen de las que existen de un destino turístico
 * @param route Almacena la dirección de la imagen de la región
 * @returns {JSX.Element}
 */
const Region = ({ route }) => {
  const [doubleClicked, setDoubleClicked] = useState(false);
  const { imageUrl } = route.params;
  let lastTap = null;

  function onClick(event) {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      setDoubleClicked(!doubleClicked);
    } else {
      lastTap = now;
    }
  }
  return (
    <SafeAreaView style={[styles.safeContainer]}>
      <View>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <Pressable onPress={onClick}>
            <Image
              style={[
                styles.region,
                doubleClicked ? { height: "100%" } : { width: image_width },
              ]}
              source={
                imageUrl
                  ? {
                      width: REGION_IMAGE_WIDTH,
                      height: REGION_IMAGE_HEIGHT,
                      uri: `${IMAGE_BASE_URL}${imageUrl}`,
                    }
                  : NoImage
              }
            />
          </Pressable>
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
    backgroundColor: "#DEDEDE",
  },
  region: {
    resizeMode: "contain",
  },
});

export default Region;
