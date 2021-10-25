import React, { useState, useEffect, useContext } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  SafeAreaView,
  Platform,
  Dimensions,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

// Componentes
import ConstantMenu from "../components/ConstantMenu";
import DestinationImageList from "../components/DestinationImageList";
import Stars from "../components/Stars";
import DestinationDescription from "../components/DestinationDescription";
import Review from "../components/Review";
import OpinionsList from "../components/OpinionsList";

// Autenticación
import { CredentialsContext } from "../CredentialsContext";

// Imagenes
import Exit from "../images/exit.png";
import Star from "../images/black_star.png";

// Configuración
import {
  API_URL,
  DESTINATIONS_URL,
  REVIEWS_URL,
  FIRST_PERCENTAGE,
  SECOND_PERCENTAGE,
  THIRD_PERCENTAGE,
  TEXT_CONTAINER_PERCENTAGE,
  REVIEWS_CONTAINER_PERCENTAGE,
} from "../config";

// Estilos globales
const appStyles = require("../appStyle");

// Altura del contenedor de la descripción del texto
const description_height =
  Dimensions.get("window").height * TEXT_CONTAINER_PERCENTAGE;
const reviews_height =
  Dimensions.get("window").height * REVIEWS_CONTAINER_PERCENTAGE;

/***
 * Pantalla que muestra la información de un destino turístico
 * @param route Almacena la información del destino
 * @param navigation Pila para el manejo de ventanas
 * @returns {JSX.Element}
 */
const Destination = ({ route, navigation }) => {
  const { destination } = route.params;
  const id = destination.id;
  const name = destination.name;
  const description = destination.description;
  const schedule = destination.schedule;
  const fare = destination.fare;
  const contact = destination.contact;
  const recommendation = destination.recommendation;
  const difficulty = destination.difficulty;
  const hikes = destination.hikes;
  const latitude = destination.latitude;
  const longitude = destination.longitude;
  const photos_path = destination.photos_path;
  const conservation_area_id = destination.conservation_area_id;

  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(0);

  const isFocused = useIsFocused();

  const endpoint = `${API_URL}${DESTINATIONS_URL}${id}/${REVIEWS_URL}`;

  const getAverage = () => {
    let average = 0;
    for (let i = 0; i < reviews.length; ++i) {
      average += reviews[i].calification;
    }
    average /= reviews.length;
    return average;
  };
  let stars;

  const getStars = () => {
    let stars = [0, 0, 0, 0, 0];
    for (let i = 0; i < reviews.length; ++i) {
      stars[reviews[i].calification - 1]++;
    }
    return stars;
  };

  useEffect(() => {
    if (isFocused) {
      let isMounted = true;
      setLoading(true);
      fetch(endpoint)
        .then((response) => response.json())
        .then((json) => {
          if (isMounted) {
            isMounted = false;

            setReviews(json);
          }
        })
        .catch((error) => console.error(error))
        .finally(() => {
          isMounted = false;
          setLoading(false);
        });
    }
  }, [isFocused]);

  const changeToInformation = () => {
    if (state !== 0) setState(0);
  };
  const changeToMap = () => {
    if (state !== 1) setState(1);
  };
  const changeToReviews = () => {
    if (state !== 2) setState(2);
  };
  if (loading) return <View></View>;
  return (
    <SafeAreaView
      style={[styles.safeContainer, appStyles.default.appBackgroundColor]}
    >
      <View
        style={[
          {
            alignItems: "center",
            justifyContent: "center",
            flex: FIRST_PERCENTAGE,
            marginBottom: 10,
          },
          Platform.OS === "android"
            ? appStyles.default.androidShadowBox
            : appStyles.default.iosShadowBox,
          { elevation: 30, backgroundColor: "rgba(0,0,0,0.5)" },
        ]}
      >
        <DestinationImageList destinationId={id} photos_path={photos_path} />
      </View>
      <Pressable
        onPress={() => navigation.pop()}
        style={[appStyles.default.exitView, { elevation: 31 }]}
      >
        <Image style={appStyles.default.exitImage} source={Exit} />
      </Pressable>
      <View style={styles.container}>
        <Text style={[appStyles.default.name, appStyles.default.defaultFont]}>
          {name}
        </Text>
        <View style={styles.scrollableContainer}>
          <ScrollView>
            <Text
              style={[
                appStyles.default.descriptionText,
                appStyles.default.defaultFont,
              ]}
            >
              {description}
            </Text>
          </ScrollView>
        </View>
        <View style={styles.horizontalContainer}>
          <Stars review={getAverage()} />
          <Text style={[styles.reviewsText, appStyles.default.defaultFont]}>
            {reviews.length} votos
          </Text>
        </View>
        <View style={styles.optionsContainer}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={[styles.optionsText, appStyles.default.defaultFont]}
              onPress={changeToInformation}
            >
              información
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
              onPress={changeToMap}
            >
              mapa
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
          <View style={{ alignItems: "center" }}>
            <Text
              style={[styles.optionsText, appStyles.default.defaultFont]}
              onPress={changeToReviews}
            >
              opiniones
            </Text>
            {state === 2 && (
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
        {state === 0 ? (
          <DestinationDescription
            schedule={schedule}
            fare={fare}
            contact={contact}
            difficulty={difficulty}
            hikes={hikes}
            recommendation={recommendation}
          />
        ) : null}
        {state === 1 ? (
          <View
            style={{
              margin: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <AreaRegion imageUrl="https://www.costaricavibes.com/wp-content/uploads/2020/05/costaricaregionmap-1024x683.jpg" /> */}
          </View>
        ) : null}
        {state === 2 ? (
          <View style={{ flex: 1 }}>
            {/* <ReviewsMenu /> */}
            <View>
              <Text style={[styles.rateText, appStyles.default.defaultFont]}>
                Califica este destino:
              </Text>
              <View style={styles.starsContainer}>
                <Pressable
                  onPress={() => {
                    storedCredentials
                      ? navigation.push("ReviewForm", {
                          destination_id: id,
                          clickedCalification: 1,
                        })
                      : navigation.push("Login");
                  }}
                >
                  <Image style={styles.starImage} source={Star} />
                </Pressable>
                <Pressable
                  onPress={() => {
                    storedCredentials
                      ? navigation.push("ReviewForm", {
                          destination_id: id,
                          clickedCalification: 2,
                        })
                      : navigation.push("Login");
                  }}
                >
                  <Image style={styles.starImage} source={Star} />
                </Pressable>
                <Pressable
                  onPress={() => {
                    storedCredentials
                      ? navigation.push("ReviewForm", {
                          destination_id: id,
                          clickedCalification: 3,
                        })
                      : navigation.push("Login");
                  }}
                >
                  <Image style={styles.starImage} source={Star} />
                </Pressable>
                <Pressable
                  onPress={() => {
                    storedCredentials
                      ? navigation.push("ReviewForm", {
                          destination_id: id,
                          clickedCalification: 4,
                        })
                      : navigation.push("Login");
                  }}
                >
                  <Image style={styles.starImage} source={Star} />
                </Pressable>
                <Pressable
                  onPress={() => {
                    storedCredentials
                      ? navigation.push("ReviewForm", {
                          destination_id: id,
                          clickedCalification: 5,
                        })
                      : navigation.push("Login");
                  }}
                >
                  <Image style={styles.starImage} source={Star} />
                </Pressable>
              </View>
              <Pressable
                onPress={() => {
                  storedCredentials
                    ? navigation.push("ReviewForm", {
                        destination_id: id,
                        clickedCalification: 0,
                      })
                    : navigation.push("Login");
                }}
              >
                <Text
                  style={[
                    styles.writeOpinionText,
                    appStyles.default.defaultFont,
                  ]}
                >
                  Escribe una opinión
                </Text>
              </Pressable>
              <View style={styles.opinionsLine} />
            </View>
            {/* <View> */}
            <View style={styles.reviewsContainer}>
              <ScrollView style={{ paddingRight: 5 }}>
                <OpinionsList starsList={getStars()} />
                {reviews
                  ? reviews.map((review, index) => (
                      <View
                        // onPress={() => {
                        //   isArea
                        //     ? navigation.push("Area", { area: item[0] })
                        //     : navigation.push("Destination", { destination: item[0] });
                        // }} EDIT
                        key={review.id}
                      >
                        <Review
                          review={review}
                          key={review.id}
                          style={{ marginLeft: 50 }}
                        />
                      </View>
                    ))
                  : null}
              </ScrollView>
            </View>
          </View>
        ) : null}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: SECOND_PERCENTAGE,
    height: "100%",
    width: "100%",
  },
  scrollableContainer: {
    height: description_height,
    paddingHorizontal: 33,
    marginTop: 19,
    marginBottom: 5,
  },
  reviewsContainer: {
    flex: 1,

    paddingHorizontal: 33,
    marginTop: 10,
    paddingBottom: 5,
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginHorizontal: 10,
    paddingBottom: 20,
    paddingHorizontal: 23,
  },
  starsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
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
  rateText: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 13,
    lineHeight: 17,

    marginHorizontal: 33,
    marginTop: 8,

    color: "#383837",
  },
  writeOpinionText: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 16,

    textAlign: "justify",
    textDecorationLine: "underline",

    marginHorizontal: 33,
    marginTop: 8,

    color: "#769F5E",
  },
  reviewsText: {
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 10,
    lineHeight: 13,
    paddingLeft: 5,

    color: "#676767",
  },
  starImage: {
    width: 28.33,
    height: 25.33,

    marginHorizontal: 5,
  },
  horizontalLine: {
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.2)",

    marginTop: 3.5,
  },
  opinionsLine: {
    width: "150%",
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

export default Destination;
