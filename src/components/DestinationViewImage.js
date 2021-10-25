import React, { useState, useEffect, useContext } from "react";
import { View, Image, Pressable, StyleSheet, Dimensions } from "react-native";
import { useIsFocused } from "@react-navigation/native";

// Autenticación
import { CredentialsContext } from "../CredentialsContext";

// Imagenes
import No_favorite from "../images/empty_heart.png";
import Favorite from "../images/filled_orange_heart.png";
import No_seen from "../images/empty_eye.png";
import Seen from "../images/seen.png";
import NoImage from "../images/no_image.png";

// Configuración
import {
  API_URL,
  DESTINATIONS_URL,
  FAVORITES_URL,
  VISITED_URL,
  ALL_URL,
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
const DestinationViewImage = ({ id, imageUrl }) => {
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const isFocused = useIsFocused();

  const [favoriteRelationId, setFavoriteRelationId] = useState(0);
  // const [visitedRelationId, setVisitedRelationId] = useState(0);
  const [loading, setLoading] = useState(true);

  const requestOptionsUser = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + storedCredentials,
    },
  };

  useEffect(() => {
    if (storedCredentials !== null) {
      const relationEndpoint = `${API_URL}${DESTINATIONS_URL}${id}/${FAVORITES_URL}`;
      let isMounted = true;
      // setLoading(true);
      fetch(relationEndpoint, requestOptionsUser)
        .then((response) => response.json())
        .then((json) => {
          if (isMounted) setFavoriteRelationId(json);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          isMounted = false;
          // setLoading(false);
        });
    }
  }, [isFocused]);

  useEffect(() => {
    if (storedCredentials !== null) {
      const relationEndpoint = `${API_URL}${DESTINATIONS_URL}${id}/${VISITED_URL}`;
      let isMounted = true;
      // setLoading(true);
      fetch(relationEndpoint, requestOptionsUser)
        .then((response) => response.json())
        .then((json) => {
          if (isMounted) setVisitedRelationId(json);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          isMounted = false;
          // setLoading(false);
        });
    }
  }, [isFocused]);

  const handle_favorite = () => {
    if (storedCredentials) {
      if (favoriteRelationId !== 0) {
        let endpoint = `${API_URL}${DESTINATIONS_URL}${ALL_URL}${FAVORITES_URL}/${favoriteRelationId}`;

        fetch(endpoint, {
          method: "DELETE",
          headers: {
            // "Content-Type": "application/json",
            Authorization: "Bearer " + storedCredentials,
          },
        })
          .then((response) => response.json())
          .then((data) => setFavoriteRelationId(0));
      } else {
        let endpoint = `${API_URL}${DESTINATIONS_URL}${id}/${FAVORITES_URL}`;

        fetch(endpoint, {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            Authorization: "Bearer " + storedCredentials,
          },
        })
          .then((response) => response.json())
          .then((json) => setFavoriteRelationId(json.id));
      }
    }
  };
  // const handle_visited = () => {
  //   if (storedCredentials) {
  //     if (visitedRelationId !== 0) {
  //       let endpoint = `${API_URL}${DESTINATIONS_URL}${ALL_URL}${VISITED_URL}/${visitedRelationId}`;

  //       fetch(endpoint, {
  //         method: "DELETE",
  //         headers: {
  //           // "Content-Type": "application/json",
  //           Authorization: "Bearer " + storedCredentials,
  //         },
  //       })
  //         .then((response) => response.json())
  //         .then((data) => setVisitedRelationId(0));
  //     } else {
  //       let endpoint = `${API_URL}${DESTINATIONS_URL}${id}/${VISITED_URL}`;

  //       fetch(endpoint, {
  //         method: "POST",
  //         headers: {
  //           // "Content-Type": "application/json",
  //           Authorization: "Bearer " + storedCredentials,
  //         },
  //       })
  //         .then((response) => response.json())
  //         .then((json) => {
  //           setVisitedRelationId(json.id);
  //         });
  //     }
  //   }
  // };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={
          imageUrl
            ? {
                width: DESTINATIONS_IMAGE_WIDTH,
                height: DESTINATIONS_IMAGE_HEIGHT,
                uri: imageUrl,
              }
            : NoImage
        }
      />
      {/* <View style={appStyles.default.favoriteView}> */}
      <Pressable
        style={appStyles.default.favoriteView}
        onPress={handle_favorite}
      >
        <Image
          style={appStyles.default.favoriteImage}
          source={favoriteRelationId !== 0 ? Favorite : No_favorite}
        />
      </Pressable>
      {/* </View> */}
      {/* <View style={appStyles.default.seenView}> */}
      {/* <Pressable style={appStyles.default.seenView} onPress={handle_visited}> */}
      <Image
        style={appStyles.default.seenImage}
        // source={visitedRelationId !== 0 ? Seen : No_seen}
      />
      {/* </Pressable> */}
      {/* </View> */}
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
