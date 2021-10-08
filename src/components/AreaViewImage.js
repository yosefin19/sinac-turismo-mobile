import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

import No_favorite from "../images/empty_heart.png";

import {
  IMAGE_BASE_URL,
  AREAS_IMAGE_WIDTH,
  AREAS_IMAGE_HEIGHT,
  FIRST_PERCENTAGE,
} from "../config";

const appStyles = require("../appStyle");

const image_height = Dimensions.get("window").height * FIRST_PERCENTAGE;
const image_width = Dimensions.get("window").width;

const AreaViewImage = ({ imageUrl }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          width: AREAS_IMAGE_WIDTH,
          height: AREAS_IMAGE_HEIGHT,
          uri: `${IMAGE_BASE_URL}${imageUrl}`,
        }}
      />
      <View style={appStyles.default.favoriteView}>
        <Image style={appStyles.default.favoriteImage} source={No_favorite} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    height: image_height,
    width: image_width,
  },
  image: {
    resizeMode: "stretch",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    width: "100%",
    height: "100%",
  },
});

export default AreaViewImage;
