import React from "react";
import { Image, StyleSheet, View } from "react-native";

// Imagenes
import Empty from "../images/empty_star.png";
import Filled from "../images/filled_star.png";
import Half from "../images/half_star.png";

/***
 * Estrellas que representan la media de puntuación de un destino
 * @param review Puntuación de un destino turístico
 * @returns {JSX.Element}
 */
const Stars = ({ review }) => {
  let stars = [];
  review = review ? review : 0;

  for (let i = 0; i < 5; ++i) {
    if (review <= 0)
      stars.push(<Image style={styles.star} key={i} source={Empty} />);
    else if (review < 1)
      stars.push(<Image style={styles.star} key={i} source={Half} />);
    else stars.push(<Image style={styles.star} key={i} source={Filled} />);
    --review;
  }

  return <View style={styles.container}>{stars}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 60,
    height: 10,
  },
  star: {
    width: 10,
    height: 10,
  },
});

export default Stars;
