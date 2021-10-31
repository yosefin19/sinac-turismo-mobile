import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Pressable,
  Text,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";

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
  AREAS_URL,
  DESTINATIONS_URL,
  FAVORITES_URL,
  VISITED_URL,
  ALL_URL,
  DESTINATIONS_IMAGE_WIDTH,
  DESTINATIONS_IMAGE_HEIGHT,
  IMAGE_IN_LIST_PERCENTAGE,
  VERTICAL_IMAGE_IN_LIST_PERCENTAGE,
} from "../config";

// Estilos globales
const appStyles = require("../appStyle");

// Ancho de la imagen a desplegar
const image_width = Dimensions.get("window").width * IMAGE_IN_LIST_PERCENTAGE;
const image_height =
  Dimensions.get("window").height * VERTICAL_IMAGE_IN_LIST_PERCENTAGE;

/***
 * Imagen y nombre de un destino presente en un área de conservación
 * @param imageUrl Dirección de la imagen
 * @returns {JSX.Element}
 */
const ViewFavoriteInformation = ({
  name,
  imageUrl,
  id,
  isArea,
  isFavorite,
}) => {
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const [favoriteRelationId, setFavoriteRelationId] = useState(0);
  const [visitedRelationId, setVisitedRelationId] = useState(0);
  const [loading, setLoading] = useState(true);

  const requestOptionsUser = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + storedCredentials,
    },
  };

  useEffect(() => {
    if (storedCredentials !== "" && storedCredentials !== null) {
      const relationEndpoint = isArea
        ? `${API_URL}${AREAS_URL}${id}/${FAVORITES_URL}`
        : `${API_URL}${DESTINATIONS_URL}${id}/${FAVORITES_URL}`;
      let isMounted = true;
      setLoading(true);
      fetch(relationEndpoint, requestOptionsUser)
        .then((response) => response.json())
        .then((json) => {
          if (isMounted) setFavoriteRelationId(json);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          isMounted = false;
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (storedCredentials !== "" && storedCredentials !== null && !isArea) {
      const relationEndpoint = `${API_URL}${DESTINATIONS_URL}${id}/${VISITED_URL}`;
      let isMounted = true;
      setLoading(true);
      fetch(relationEndpoint, requestOptionsUser)
        .then((response) => response.json())
        .then((json) => {
          if (isMounted) setVisitedRelationId(json);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          isMounted = false;
          setLoading(false);
        });
    }
  }, []);

  const handle_favorite = () => {
    if (storedCredentials) {
      if (favoriteRelationId !== 0) {
        let endpoint = isArea
          ? `${API_URL}${AREAS_URL}${ALL_URL}${FAVORITES_URL}/${favoriteRelationId}`
          : `${API_URL}${DESTINATIONS_URL}${ALL_URL}${FAVORITES_URL}/${favoriteRelationId}`;

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
        let endpoint = isArea
          ? `${API_URL}${AREAS_URL}${id}/${FAVORITES_URL}`
          : `${API_URL}${DESTINATIONS_URL}${id}/${FAVORITES_URL}`;

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
  const handle_visited = () => {
    if (storedCredentials) {
      if (visitedRelationId !== 0) {
        let endpoint = `${API_URL}${DESTINATIONS_URL}${ALL_URL}${VISITED_URL}/${visitedRelationId}`;

        fetch(endpoint, {
          method: "DELETE",
          headers: {
            // "Content-Type": "application/json",
            Authorization: "Bearer " + storedCredentials,
          },
        })
          .then((response) => response.json())
          .then((data) => setVisitedRelationId(0));
      } else {
        let endpoint = `${API_URL}${DESTINATIONS_URL}${id}/${VISITED_URL}`;

        fetch(endpoint, {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            Authorization: "Bearer " + storedCredentials,
          },
        })
          .then((response) => response.json())
          .then((json) => setVisitedRelationId(json.id));
      }
    }
  };

  return (
    <View style={[styles.container]}>
      {imageUrl ? (
        <Image
          style={[styles.image]}
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
      ) : (
        <Image style={[styles.image]} source={NoImage} />
      )}
      {/* {storedCredentials ? (
        <View>
          <Pressable style={appStyles.default.seenView}>
            <Image style={appStyles.default.seenImage} source={Favorite} />
          </Pressable>
          <Pressable style={appStyles.default.favoriteView}>
            <Image style={appStyles.default.favoriteImage} source={Favorite} />
          </Pressable>
        </View>
      ) : ( */}
      <View style={styles.horizontalContainer}>
        {!isArea ? (
          <Pressable style={styles.seenView} onPress={handle_visited}>
            <Image
              style={appStyles.default.seenImage}
              source={visitedRelationId !== 0 ? Seen : No_seen}
            />
          </Pressable>
        ) : null}
        <Pressable style={styles.favoriteView} onPress={handle_favorite}>
          <Image
            style={appStyles.default.favoriteImage}
            source={favoriteRelationId !== 0 ? Favorite : No_favorite}
          />
        </Pressable>
      </View>
      {/* )} */}
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
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: image_height,

    marginHorizontal: 10,
    marginVertical: 10,
  },
  horizontalContainer: {
    position: "absolute",
    flexDirection: "row",
    right: 0,
    top: 0,
    marginTop: 3,
    marginRight: 3,
  },
  seenView: {
    width: 31,
    height: 31,
    backgroundColor: "#F0F0F0",
    borderRadius: 60,

    marginHorizontal: 3,

    alignItems: "center",
    justifyContent: "center",
  },
  favoriteView: {
    width: 31,
    height: 31,
    backgroundColor: "#F0F0F0",
    borderRadius: 60,
    marginHorizontal: 3,

    alignItems: "center",
    justifyContent: "center",
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

export default ViewFavoriteInformation;
