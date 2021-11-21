import React, { useState, useEffect, useContext } from "react";
import { View, Pressable, Image, Dimensions, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";

// Imagenes
import No_favorite from "../images/empty_heart.png";
import Favorite from "../images/filled_orange_heart.png";
import NoImage from "../images/no_image.png";

// Configuración
import {
  API_URL,
  AREAS_URL,
  FAVORITES_URL,
  ALL_URL,
  IMAGE_BASE_URL,
  AREAS_IMAGE_WIDTH,
  AREAS_IMAGE_HEIGHT,
  FIRST_PERCENTAGE,
} from "../config";

// Autenticación
import { CredentialsContext } from "../CredentialsContext";

// Estilos globales
const appStyles = require("../appStyle");

// Dimensiones de la imagen
const image_height = Dimensions.get("window").height * FIRST_PERCENTAGE;
const image_width = Dimensions.get("window").width;

/***
 * Imagen de entre las presentes de un área de conservación
 * @param imageUrl Dirección de la imagen
 * @returns {JSX.Element}
 */
const AreaViewImage = ({ areaId, imageUrl }) => {
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused();

  const favoriteEndpoint = `${API_URL}${AREAS_URL}${areaId}/${FAVORITES_URL}`;
  const requestOptionsUser = {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Authorization: "Bearer " + storedCredentials,
    },
  };

  useEffect(() => {
    if (storedCredentials !== "" && storedCredentials !== null) {
      let isMounted = true;
      setLoading(true);
      fetch(favoriteEndpoint, requestOptionsUser)
        .then((response) => response.json())
        .then((json) => {
          if (isMounted) setIsFavorite(json);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          isMounted = false;
          setLoading(false);
        });
    }
  }, [isFocused]);

  const handleFavorite = () => {
    if (storedCredentials) {
      if (isFavorite !== 0) {
        let endpoint = `${API_URL}${AREAS_URL}${ALL_URL}${FAVORITES_URL}/${isFavorite}`;

        fetch(endpoint, {
          method: "DELETE",
          headers: {
            // "Content-Type": "application/json",
            Authorization: "Bearer " + storedCredentials,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setIsFavorite(0);
          });
      } else {
        fetch(favoriteEndpoint, {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            Authorization: "Bearer " + storedCredentials,
          },
        })
          .then((response) => response.json())
          .then((json) => setIsFavorite(json.id));
      }
    }
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
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
      <View style={appStyles.default.favoriteView}>
        <Pressable onPress={handleFavorite}>
          <Image
            style={appStyles.default.favoriteImage}
            source={isFavorite !== false ? Favorite : No_favorite}
          />
        </Pressable>
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

export default AreaViewImage;
