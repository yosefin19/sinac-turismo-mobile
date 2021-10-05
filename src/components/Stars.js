import React from "react";

import { Image, StyleSheet, View } from "react-native";

import Empty from "../images/empty_star.png";
import Filled from "../images/filled_star.png";
import Half from "../images/half_star.png";

const Stars = ({ reviewAverage }) => {
  let stars = [];
  reviewAverage = reviewAverage ? reviewAverage : 0;

  for (let i = 0; i < 5; ++i) {
    if (reviewAverage <= 0)
      stars.push(<Image style={styles.star} key={i} source={Empty} />);
    else if (reviewAverage < 1)
      stars.push(<Image style={styles.star} key={i} source={Half} />);
    else stars.push(<Image style={styles.star} key={i} source={Filled} />);
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
