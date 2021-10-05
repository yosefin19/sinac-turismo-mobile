import React from "react";

import { View, ScrollView, Text, Image, StyleSheet } from "react-native";
import Difficulty from "./Difficulty";

const DestinationDescription = ({
  schedule,
  fare,
  contact,
  difficulty,
  hikes,
  recommendation,
}) => (
  <View style={styles.container}>
    <ScrollView style={{ paddingRight: 10 }}>
      {/* Horario */}
      {schedule && (
        <View style={styles.verticalContainer}>
          <Text style={styles.titleText}>Horario:</Text>
          <Text style={styles.bodyText}>{schedule}</Text>
        </View>
      )}
      {fare && (
        <View style={styles.verticalContainer}>
          <Text style={styles.titleText}>Tarifas:</Text>
          <Text style={styles.bodyText}>{fare}</Text>
        </View>
      )}
      {contact && (
        <View style={styles.horizontalContainer}>
          <Text style={[styles.titleText, { marginRight: 2 }]}>Contacto:</Text>
          <Text style={styles.bodyText}>{contact}</Text>
        </View>
      )}
      <View style={styles.verticalContainer}>
        <Text style={styles.titleText}>Dificultad:</Text>
        <Difficulty difficultyRate={difficulty} />
      </View>
      {hikes && (
        <View style={styles.horizontalContainer}>
          <Text style={[styles.titleText, { marginRight: 2 }]}>Caminata:</Text>
          <Text style={styles.bodyText}>{hikes}</Text>
        </View>
      )}
      {recommendation && (
        <View style={styles.verticalContainer}>
          <Text style={styles.titleText}>¿Qué llevar?:</Text>
          <Text style={styles.bodyText}>{recommendation}</Text>
        </View>
      )}
      <View style={styles.horizontalLine} />
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 260,
    paddingTop: 20, //15,
    paddingLeft: 33, //30,
    paddingRight: 16,
  },
  verticalContainer: {
    marginBottom: 10,
  },
  horizontalContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,

    // marginHorizontal: 10,
    // paddingBottom: 20,
  },
  accessInformation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,

    // justifyContent: "space-between",

    // marginHorizontal: 10,
    // paddingBottom: 20,
  },
  titleText: {
    fontFamily: "Segoe UI",
    // fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 12,
    lineHeight: 16,

    color: "#7B7B7B",
  },
  bodyText: {
    fontFamily: "Segoe UI",
    // fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 12,
    lineHeight: 16,

    color: "#7B7B7B",
  },
  distanceText: {
    fontFamily: "Segoe UI",
    // fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 10,
    lineHeight: 13,
    textAlign: "center",

    color: "#7b7b7b",
    opacity: 0.78,
  },
  imageBox: {
    width: 15,
    height: 15,
  },
  horizontalLine: {
    width: "150%",
    borderWidth: 0.18,
    borderColor: "#000",

    marginTop: 3.5,
    marginHorizontal: -100,
  },
});

export default DestinationDescription;
