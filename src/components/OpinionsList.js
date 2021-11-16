import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Componentes
import OpinionsLine from "./OpinionsLine";

// Estilos globales
const appStyles = require("../appStyle");

/***
 * Lista que almacena información de las reseñas de un destino
 * @param fiveStarsCount Cantidad de reseñas de 5 estrellas
 * @param fourStarsCount Cantidad de reseñas de 4 estrellas
 * @param threeStarsCount Cantidad de reseñas de 3 estrellas
 * @param twoStarsCount Cantidad de reseñas de 2 estrellas
 * @param oneStarsCount Cantidad de reseñas de 1 estrella
 * @returns {JSX.Element}
 */
const OpinionsList = ({ starsList }) => {
  const fiveStarsCount = starsList[4];
  const fourStarsCount = starsList[3];
  const threeStarsCount = starsList[2];
  const twoStarsCount = starsList[1];
  const oneStarsCount = starsList[0];
  const totalReviews =
    fiveStarsCount +
    fourStarsCount +
    threeStarsCount +
    twoStarsCount +
    oneStarsCount;
  return (
    <View>
      <View>
        <View style={styles.horizontalContainer}>
          <Text style={[styles.leftLineText, appStyles.default.defaultFont]}>
            excelente
          </Text>
          <OpinionsLine totalReviews={totalReviews} reviews={fiveStarsCount} />
          <Text style={[styles.rightLineText, appStyles.default.defaultFont]}>
            {fiveStarsCount}
          </Text>
        </View>
        <View style={styles.horizontalContainer}>
          <Text style={[styles.leftLineText, appStyles.default.defaultFont]}>
            muy bueno
          </Text>
          <OpinionsLine totalReviews={totalReviews} reviews={fourStarsCount} />
          <Text style={[styles.rightLineText, appStyles.default.defaultFont]}>
            {fourStarsCount}
          </Text>
        </View>
        <View style={styles.horizontalContainer}>
          <Text style={[styles.leftLineText, appStyles.default.defaultFont]}>
            normal
          </Text>
          <OpinionsLine totalReviews={totalReviews} reviews={threeStarsCount} />
          <Text style={[styles.rightLineText, appStyles.default.defaultFont]}>
            {threeStarsCount}
          </Text>
        </View>
        <View style={styles.horizontalContainer}>
          <Text style={[styles.leftLineText, appStyles.default.defaultFont]}>
            malo
          </Text>
          <OpinionsLine totalReviews={totalReviews} reviews={twoStarsCount} />
          <Text style={[styles.rightLineText, appStyles.default.defaultFont]}>
            {twoStarsCount}
          </Text>
        </View>
        <View style={styles.horizontalContainer}>
          <Text style={[styles.leftLineText, appStyles.default.defaultFont]}>
            pésimo
          </Text>
          <OpinionsLine totalReviews={totalReviews} reviews={oneStarsCount} />
          <Text style={[styles.rightLineText, appStyles.default.defaultFont]}>
            {oneStarsCount}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  horizontalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  leftLineText: {
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 10,
    lineHeight: 13,

    width: 60,

    color: "#676767",
  },
  rightLineText: {
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 10,
    lineHeight: 13,
    textAlign: "right",

    width: 25,

    color: "#676767",
  },
});

export default OpinionsList;
