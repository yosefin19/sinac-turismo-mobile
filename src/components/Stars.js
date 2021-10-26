import React from "react";
import { Image, StyleSheet, View } from "react-native";

// Imagenes

/***
 * Estrellas que representan la media de puntuación de un destino
 * @param reviewAverage Media de la puntuación de un destino turístico
 * @param emptyStar imagen de icono vacio
 * @param halfStar imagen del icono a la mitad
 * @param filledStar imagen del icono lleno o completo
 * @returns {JSX.Element}
 */
const Stars = ({ reviewAverage, emptyStar, halfStar, filledStar }) => {
  let stars = [];
  reviewAverage = reviewAverage ? reviewAverage : 0;

  for (let i = 0; i < 5; ++i) {
    if (reviewAverage <= 0)
      stars.push(<Image style={styles.star} key={i} source={emptyStar} />);
    else if (reviewAverage < 1)
      stars.push(<Image style={styles.star} key={i} source={halfStar} />);
    else stars.push(<Image style={styles.star} key={i} source={filledStar} />);
    --reviewAverage;
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
