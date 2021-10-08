import React from "react";
import { View, Text, Image, StyleSheet, Platform } from "react-native";

import Favorite from "../images/favorite.png";

import { DESTINATIONS_IMAGE_WIDTH, DESTINATIONS_IMAGE_HEIGHT } from "../config";

const appStyles = require("../appStyle");

const ViewImageInformation = ({ name, imageUrl }) => (
  <View style={[styles.container, appStyles.default.informativeImageListSize]}>
    <Image
      style={[styles.image, appStyles.default.informativeImageSize]}
      source={{
        width: DESTINATIONS_IMAGE_WIDTH,
        height: DESTINATIONS_IMAGE_HEIGHT,
        uri: imageUrl,
      }}
    />
    <View style={appStyles.default.favoriteView}>
      <Image style={appStyles.default.favoriteImage} source={Favorite} />
    </View>
    <View
      style={[
        styles.nameView,
        Platform.OS === "android"
          ? appStyles.default.androidShadowBox
          : appStyles.default.iosShadowBox,
      ]}
    >
      <Text style={[styles.name, appStyles.default.defaultFont]}>{name}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  nameView: {
    position: "absolute",
    borderRadius: 7,
    backgroundColor: "#769F5E",
    height: 41,
    width: "105%",
    bottom: 8,
    right: -5,
    padding: 3,
  },
  name: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 16,

    color: "#383837",
  },
  image: {
    resizeMode: "stretch",
    borderRadius: 7,
  },
});

export default ViewImageInformation;
