import React from "react";

import { View, StyleSheet } from "react-native";

const Difficulty = ({ difficultyRate }) => {
  let squares = [];
  difficultyRate = difficultyRate ? difficultyRate : 0;

  for (let i = 0; i < 5; ++i) {
    if (difficultyRate <= 0)
      squares.push(<View style={styles.emptySquare} key={i} />);
    else squares.push(<View style={styles.filledSquare} key={i} />);
    --difficultyRate;
  }

  return <View style={styles.container}>{squares}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 80,
    height: 14,
  },
  filledSquare: {
    width: 14,
    height: 14,
    backgroundColor: "#DD9B5E",
    borderRadius: 4,
  },
  emptySquare: {
    width: 14,
    height: 14,
    borderWidth: 0.5,
    borderColor: "#DD9B5E",
    borderRadius: 4,
  },
});

export default Difficulty;
