import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

// import PropTypes from "prop-types";

// Styles
// import { Wrapper, IconText, IconImage } from "./Icon.styles";

const Icon = ({ text, imageUrl, width, height }) => (
  <View style={styles.wrapper}>
    <Image
      style={[{ width: width }, { height: height }]}
      source={imageUrl}
      alt="Icon"
    />
    <Text style={styles.iconText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  wrapper: { alignItems: "center" },
  // iconImage: {
  //   width: 21.49,
  //   height: 19.72,
  // },
  iconText: {
    // fontFamily: "Open Sans",
    fontFamily: "Segoe UI",

    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 9,
    lineHeight: 12,
    textAlign: "center",

    color: "#7f7f7f",
  },
});

export default Icon;
