import React from "react";

import { View, Text, StyleSheet } from "react-native";

import OpinionsLine from "./OpinionsLine";

const OpinionsList = ({
  fiveStarsCount,
  fourStarsCount,
  threeStarsCount,
  twoStarsCount,
  oneStarsCount,
}) => {
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
          <Text style={styles.leftLineText}>excelente</Text>
          <OpinionsLine totalReviews={totalReviews} reviews={fiveStarsCount} />
          <Text style={styles.rightLineText}>{fiveStarsCount}</Text>
        </View>
        <View style={styles.horizontalContainer}>
          <Text style={styles.leftLineText}>muy bueno</Text>
          <OpinionsLine totalReviews={totalReviews} reviews={fourStarsCount} />
          <Text style={styles.rightLineText}>{fourStarsCount}</Text>
        </View>
        <View style={styles.horizontalContainer}>
          <Text style={styles.leftLineText}>normal</Text>
          <OpinionsLine totalReviews={totalReviews} reviews={threeStarsCount} />
          <Text style={styles.rightLineText}>{threeStarsCount}</Text>
        </View>
        <View style={styles.horizontalContainer}>
          <Text style={styles.leftLineText}>malo</Text>
          <OpinionsLine totalReviews={totalReviews} reviews={twoStarsCount} />
          <Text style={styles.rightLineText}>{twoStarsCount}</Text>
        </View>
        <View style={styles.horizontalContainer}>
          <Text style={styles.leftLineText}>pésimo</Text>
          <OpinionsLine totalReviews={totalReviews} reviews={oneStarsCount} />
          <Text style={styles.rightLineText}>{oneStarsCount}</Text>
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
    fontFamily: "Segoe UI",

    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 10,
    lineHeight: 13,

    width: 60,

    color: "#676767",
  },
  rightLineText: {
    fontFamily: "Segoe UI",

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
