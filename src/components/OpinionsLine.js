import React from "react";
import { View, StyleSheet } from "react-native";

/***
 * Líneas que representan los porcentajes de opiniones
 * @param totalReviews Total de reseñas de un destino
 * @param reviews Reseñas de la línea actual
 * @returns {JSX.Element}
 */
const OpinionsLine = ({ totalReviews, reviews }) => {
  const percentage = (reviews / totalReviews) * 100 + "%";
  const filledLine = (
    <View style={[styles.filledLine, { width: percentage }]}></View>
  );

  return <View style={styles.containerLine}>{filledLine}</View>;
};

const styles = StyleSheet.create({
  containerLine: {
    width: "70%",
    height: 10,

    borderRadius: 7,
    backgroundColor: "#E5E5E5",
  },
  filledLine: {
    height: 10,
    borderRadius: 7,
    backgroundColor: "#769f5e",
    opacity: 0.6,
  },
});

export default OpinionsLine;
