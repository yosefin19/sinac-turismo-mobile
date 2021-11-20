import React, { useState, useEffect, useContext } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  Platform,
  Dimensions,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

// Autenticación
import { CredentialsContext } from "../CredentialsContext";

// Componentes
import ConstantMenu from "../components/ConstantMenu";
import ProfileImageList from "../components/ProfileImageList";

// Imagenes
import Exit from "../images/exit.png";

// Configuración
import {
  API_URL,
  AREAS_URL,
  DESTINATIONS_URL,
  FAVORITES_URL,
  VISITED_URL,
  ALL_URL,
  FIRST_PERCENTAGE,
  SECOND_PERCENTAGE,
  THIRD_PERCENTAGE,
  TEXT_CONTAINER_PERCENTAGE,
} from "../config";

// Estilos globales
const appStyles = require("../appStyle");

// Altura del contenedor de la descripción del texto
const description_height =
  Dimensions.get("window").height * TEXT_CONTAINER_PERCENTAGE;

/***
 * Pantalla que muestra los destinos o áreas marcadas como favoritas
 * o los destinos marcados como visitados.
 * @param navigation Pila para el manejo de ventanas
 * @returns {JSX.Element}
 */
const Favorites = ({ navigation }) => {
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const [favoriteAreas, setFavoriteAreas] = useState([]);
  const [favoriteDestinations, setFavoriteDestinations] = useState([]);
  const [visited, setVisited] = useState([]);

  const isFocused = useIsFocused();

  const requestOptionsUser = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + storedCredentials,
    },
  };
  const [loading, setLoading] = useState(true);

  const favoriteAreasEndpoint = `${API_URL}${AREAS_URL}${ALL_URL}${FAVORITES_URL}`;
  useEffect(() => {
    let isMounted = true;
    fetch(favoriteAreasEndpoint, requestOptionsUser)
      .then((response) => response.json())
      .then((json) => {
        if (isMounted) setFavoriteAreas(json);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        isMounted = false;
        setLoading(false);
      });
  }, [isFocused]);

  const favoriteDestinationsEndpoint = `${API_URL}${DESTINATIONS_URL}${ALL_URL}${FAVORITES_URL}`;
  useEffect(() => {
    let isMounted = true;
    fetch(favoriteDestinationsEndpoint, requestOptionsUser)
      .then((response) => response.json())
      .then((json) => {
        if (isMounted) setFavoriteDestinations(json);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        isMounted = false;
        setLoading(false);
      });
  }, [isFocused]);

  const visitedEndpoint = `${API_URL}${DESTINATIONS_URL}${ALL_URL}${VISITED_URL}`;
  useEffect(() => {
    let isMounted = true;
    fetch(visitedEndpoint, requestOptionsUser)
      .then((response) => response.json())
      .then((json) => {
        if (isMounted) setVisited(json);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        isMounted = false;
        setLoading(false);
      });
  }, [isFocused]);

  const [state, setState] = useState(0);

  const changeToFavorites = () => {
    if (state !== 0) setState(0);
  };
  const changeToVisited = () => {
    if (state !== 1) setState(1);
  };

  if (loading) {
    return null;
  }

  return (
    <SafeAreaView
      style={[styles.safeContainer, appStyles.default.appBackgroundColor]}
    >
      <Pressable
        onPress={() => navigation.pop()}
        style={[appStyles.default.exitView, { elevation: 31 }]}
      >
        <Image style={appStyles.default.exitImage} source={Exit} />
      </Pressable>
      <View style={styles.container}>
        <View
          style={{
            flex: FIRST_PERCENTAGE + SECOND_PERCENTAGE,
            width: "100%",
            marginTop: 50,
          }}
        >
          <Text style={[appStyles.default.name, appStyles.default.defaultFont]}>
            {state === 0 ? "Favoritos" : "Visitados"}
          </Text>
          <View style={styles.optionsContainer}>
            <View style={{ alignItems: "center" }}>
              <Text
                style={[styles.optionsText, appStyles.default.defaultFont]}
                onPress={changeToFavorites}
              >
                favoritos
              </Text>
              {state === 0 && (
                <View
                  style={[
                    styles.selectedLine,
                    Platform.OS === "android"
                      ? appStyles.default.androidShadowBox
                      : appStyles.default.iosShadowBox,
                  ]}
                />
              )}
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={[styles.optionsText, appStyles.default.defaultFont]}
                onPress={changeToVisited}
              >
                visitados
              </Text>
              {state === 1 && (
                <View
                  style={[
                    styles.selectedLine,
                    Platform.OS === "android"
                      ? appStyles.default.androidShadowBox
                      : appStyles.default.iosShadowBox,
                  ]}
                />
              )}
            </View>
          </View>
          <View
            style={[
              styles.horizontalLine,
              Platform.OS === "android"
                ? appStyles.default.androidShadowBox
                : appStyles.default.iosShadowBox,
              { zIndex: 999 },
              { elevation: -10 },
            ]}
          />
          <View
            style={{
              flex: 1,
              marginBottom: 10,
            }}
          >
            {state === 0 && (
              <ProfileImageList
                areas={favoriteAreas}
                destinations={favoriteDestinations}
                isFavorite={true}
                style={{ backgroundColor: "#000" }}
                navigation={navigation}
              />
            )}
            {state === 1 && (
              <ProfileImageList
                areas={[]}
                destinations={visited}
                isFavorite={false}
                navigation={navigation}
              />
            )}
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: THIRD_PERCENTAGE,
            width: "100%",
          }}
        >
          <ConstantMenu navigation={navigation} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    height: "100%",
    width: "100%",
  },
  scrollableContainer: {
    height: description_height,
    paddingHorizontal: 33,
    marginTop: 19,
    marginBottom: 5,
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginHorizontal: 10,
    paddingBottom: 20,
    paddingHorizontal: 23,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    marginHorizontal: 10,
  },
  selectedLine: {
    borderWidth: 1,
    borderColor: "#DD9B5E",
    margin: 10,
    width: "100%",
    position: "absolute",
    top: 10,
  },
  optionsText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 13,
    lineHeight: 17,

    color: "#7f7f7f",
  },
  reviewsText: {
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 10,
    lineHeight: 13,
    paddingLeft: 5,

    color: "#676767",
  },
  horizontalLine: {
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.2)",

    marginTop: 3.5,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default Favorites;
