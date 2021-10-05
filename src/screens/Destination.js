import React, { useState } from "react";

import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";

// Components
import ConstantMenu from "../components/ConstantMenu";
import DestinationImageList from "../components/DestinationImageList";
import Stars from "../components/Stars";
import DestinationDescription from "../components/DestinationDescription";
import OpinionsMenu from "../components/OptionsMenu";

import Exit from "../images/exit.png";
import AreaRegion from "../components/AreaRegion";

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
    <SafeAreaView style={styles.safeContainer}>
      <DestinationImageList photos_path={photos_path} />
      <View style={styles.exitView}>
        <Image style={styles.exitImage} source={Exit} />
      </View>
      <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.scrollableContainer}>
          <ScrollView>
            <Text style={styles.descriptionText}>{description}</Text>
          </ScrollView>
        </View>
        <View style={styles.horizontalContainer}>
          <Stars reviewAverage={4.5} />
          <Text style={styles.reviewsText}>480 votos</Text>
        </View>
        <View style={styles.optionsContainer}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.optionsText} onPress={changeToInformation}>
              información
            </Text>
            {state === 0 && (
              <View
                style={[
                  styles.selectedLine,
                  Platform.OS === "android"
                    ? styles.androidShadowBox
                    : styles.iosShadowBox,
                ]}
              />
            )}
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.optionsText} onPress={changeToMap}>
              mapa
            </Text>
            {state === 1 && (
              <View
                style={[
                  styles.selectedLine,
                  Platform.OS === "android"
                    ? styles.androidShadowBox
                    : styles.iosShadowBox,
                ]}
              />
            )}
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.optionsText} onPress={changeToReviews}>
              opiniones
            </Text>
            {state === 2 && (
              <View
                style={[
                  styles.selectedLine,
                  Platform.OS === "android"
                    ? styles.androidShadowBox
                    : styles.iosShadowBox,
                ]}
              />
            )}
          </View>
        </View>
        <View
          style={[
            styles.horizontalLine,
            Platform.OS === "android"
              ? styles.androidShadowBox
              : styles.iosShadowBox,
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
            <AreaRegion imageUrl="https://www.costaricavibes.com/wp-content/uploads/2020/05/costaricaregionmap-1024x683.jpg" />
          </View>
        )}
        {state === 2 && <OpinionsMenu />}
      </View>
      <ConstantMenu />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    width: "100%",
    height: "100%",

    backgroundColor: "#F0F0F0",
    justifyContent: "center",
  },
  container: {
    flex: 0.99,
  },
  scrollableContainer: {
    height: 45,
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
  iosShadowBox: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  androidShadowBox: {
    elevation: 5, //5
    shadowColor: "#52006A",
  },
  exitView: {
    position: "absolute",

    width: 31,
    height: 31,
    backgroundColor: "#F0F0F0",
    borderRadius: 60,
    left: 19,
    top: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  exitImage: {
    width: 18.67,
    height: 9.33,
  },
  name: {
    fontFamily: "Segoe UI",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 24,

    marginHorizontal: 33,
    marginTop: 20,

    color: "#383837",
  },
  titleText: {
    fontFamily: "Segoe UI",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 9,
    lineHeight: 12,

    color: "#383837",
  },
  optionsText: {
    fontFamily: "Segoe UI",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 13,
    lineHeight: 17,

    color: "#7f7f7f",
  },
  descriptionText: {
    fontFamily: "Segoe UI",
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 12,
    lineHeight: 16,

    color: "#7B7B7B",
  },
  reviewsText: {
    fontFamily: "Segoe UI",
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 10,
    lineHeight: 13,
    paddingLeft: 5,

    color: "#676767",
  },
  horizontalLine: {
    borderWidth: 0.18,
    borderColor: "#000",

    marginTop: 3.5,
    zIndex: -999,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default Destination;
