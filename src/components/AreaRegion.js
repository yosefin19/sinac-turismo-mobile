import React from "react";

import { Image, View, StyleSheet, Platform, Pressable } from "react-native";

import Arrow from "../images/arrow.png";

import {
  IMAGE_BASE_URL,
  AREAS_IMAGE_WIDTH,
  AREAS_IMAGE_HEIGHT,
} from "../config";

const appStyles = require("../appStyle");

const AreaRegion = ({ imageUrl, navigation }) => (
  <View
    style={[
      styles.container,
      appStyles.default.regionSize,
      Platform.OS === "android"
        ? appStyles.default.androidShadowBox
        : appStyles.default.iosShadowBox,
    ]}
  >
    <Image
      style={styles.region}
      source={{
        width: AREAS_IMAGE_WIDTH,
        height: AREAS_IMAGE_HEIGHT,
        uri: `${IMAGE_BASE_URL}${imageUrl}`,
      }}
    />
    <Pressable
      onPress={() => {
        navigation.push("Region", { imageUrl: imageUrl });
      }}
      style={appStyles.default.arrowView}
    >
      <Image style={appStyles.default.arrow} source={Arrow} />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    resizeMode: "stretch",
    marginHorizontal: 10,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    backgroundColor: "#000",
  },
  region: {
    resizeMode: "stretch",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    width: "100%",
    height: "100%",
  },
});

export default AreaRegion;
