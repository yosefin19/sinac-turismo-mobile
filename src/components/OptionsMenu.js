import React from "react";

import { View, ScrollView, Text, Image, StyleSheet } from "react-native";

import OpinionsList from "./OpinionsList";

import Star from "../images/black_star.png";

const appStyles = require("../appStyle");

const OpinionsMenu = () => {
  return (
    <View>
      <Text style={[styles.rateText, appStyles.default.defaultFont]}>
        Califica este destino:
      </Text>
      <View style={styles.horizontalContainer}>
        <Image style={styles.starImage} source={Star} />
        <Image style={styles.starImage} source={Star} />
        <Image style={styles.starImage} source={Star} />
        <Image style={styles.starImage} source={Star} />
        <Image style={styles.starImage} source={Star} />
      </View>
      <Text style={[styles.writeOpinionText, appStyles.default.defaultFont]}>
        Escribe una opinión
      </Text>
      <View style={styles.horizontalLine} />
      {/* // View de excelente... */}
      <View style={styles.scrollableContainer}>
        <ScrollView>
          <OpinionsList
            fiveStarsCount={50}
            fourStarsCount={10}
            threeStarsCount={10}
            twoStarsCount={10}
            oneStarsCount={10}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 220,
  },
  horizontalContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  scrollableContainer: {
    height: 143,
    paddingHorizontal: 33,
    marginTop: 19,
    marginBottom: 5,
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
  starImage: {
    width: 28.33,
    height: 25.33,

    marginHorizontal: 5,
  },
  horizontalLine: {
    width: "150%",
    borderWidth: 0.18,
    borderColor: "#000",

    marginTop: 3.5,
    marginHorizontal: -100,
  },
});

export default OpinionsMenu;
