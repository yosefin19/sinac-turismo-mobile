import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  Dimensions, Pressable,
} from "react-native";

// Componentes
import ConstantMenu from "../components/ConstantMenu";
import DestinationImageList from "../components/DestinationImageList";
import Stars from "../components/Stars";
import DestinationDescription from "../components/DestinationDescription";
import OpinionsMenu from "../components/OptionsMenu";

// Imagenes
import Exit from "../images/exit.png";
import Empty from "../images/empty_star.png";
import Filled from "../images/filled_star.png";
import Half from "../images/half_star.png";

// Configuración
import {
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
 * Pantalla que muestra la información de un destino turístico
 * @param route Almacena la información del destino
 * @param navigation Pila para el manejo de ventanas
 * @returns {JSX.Element}
 */
const Destination = ({ route, navigation }) => {
  const { destination } = route.params;
  const loading = destination.loading;
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

  const [state, setState] = useState(0);

  const changeToInformation = () => {
    if (state !== 0) setState(0);
  };
  const changeToMap = () => {
    if (state !== 1) setState(1);
  };
  const changeToReviews = () => {
    if (state !== 2) setState(2);
  };
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
        <DestinationImageList photos_path={photos_path} />
      </View>
      <View style={[appStyles.default.exitView, { elevation: 31 }]}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image style={appStyles.default.exitImage} source={Exit} />
        </Pressable>
      </View>
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
          <Stars reviewAverage={4.5} emptyStar={Empty} halfStar={Half} filledStar={Filled}/>
          <Text style={[styles.reviewsText, appStyles.default.defaultFont]}>
            480 votos
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
        {state === 0 && (
          <DestinationDescription
            schedule={schedule}
            fare={fare}
            contact={contact}
            difficulty={difficulty}
            hikes={hikes}
            recommendation={recommendation}
          />
        )}
        {state === 1 && (
          <View
            style={{
              margin: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <AreaRegion imageUrl="https://www.costaricavibes.com/wp-content/uploads/2020/05/costaricaregionmap-1024x683.jpg" /> */}
          </View>
        )}
        {state === 2 && <OpinionsMenu />}
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: THIRD_PERCENTAGE,
          width: "100%",
        }}
      >
        <ConstantMenu />
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

export default Destination;
