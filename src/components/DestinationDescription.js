import React from "react";

import { View, ScrollView, Text, StyleSheet } from "react-native";
import Difficulty from "./Difficulty";

const appStyles = require("../appStyle");

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
      {schedule ? (
        <View style={styles.verticalContainer}>
          <Text style={[styles.titleText, appStyles.default.defaultFont]}>
            Horario:
          </Text>
          <Text style={[styles.bodyText, appStyles.default.defaultFont]}>
            {schedule}
          </Text>
        </View>
      ) : null}
      {contact ? (
        <View style={styles.horizontalContainer}>
          <Text
            style={[
              styles.titleText,
              { marginRight: 2 },
              appStyles.default.defaultFont,
            ]}
          >
            Contacto:
          </Text>
          <Text style={[styles.bodyText, appStyles.default.defaultFont]}>
            {contact}
          </Text>
        </View>
      ) : null}
      <View style={styles.verticalContainer}>
        {fare ? (
          <View style={styles.verticalContainer}>
            <Text style={[styles.titleText, appStyles.default.defaultFont]}>
              Tarifas:
            </Text>
            <Text style={[styles.bodyText, appStyles.default.defaultFont]}>
              {fare}
            </Text>
          </View>
        ) : null}
        <Text style={[styles.titleText, appStyles.default.defaultFont]}>
          Dificultad:
        </Text>
        <Difficulty difficultyRate={difficulty} />
      </View>
      {hikes ? (
        <View style={styles.horizontalContainer}>
          <Text
            style={[
              styles.titleText,
              { marginRight: 2 },
              appStyles.default.defaultFont,
            ]}
          >
            Caminata:
          </Text>
          <Text style={[styles.bodyText, appStyles.default.defaultFont]}>
            {hikes}
          </Text>
        </View>
      ) : null}
      {recommendation ? (
        <View style={styles.verticalContainer}>
          <Text style={[styles.titleText, appStyles.default.defaultFont]}>
            ¿Qué llevar?:
          </Text>
          <Text style={[styles.bodyText, appStyles.default.defaultFont]}>
            {recommendation}
          </Text>
        </View>
      ) : null}
      <View style={styles.horizontalLine} />
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 240,
    paddingTop: 20,
    paddingLeft: 33,
    paddingRight: 16,
  },
  verticalContainer: {
    marginBottom: 10,
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  accessInformation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  titleText: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 12,
    lineHeight: 16,

    color: "#7B7B7B",
  },
  bodyText: {
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 12,
    lineHeight: 16,

    color: "#7B7B7B",
  },
  distanceText: {
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
