import React from "react";

import { View, FlatList, StyleSheet } from "react-native";
import DestinationViewImage from "./DestinationViewImage";

import { IMAGE_BASE_URL } from "../config";

const appStyles = require("../appStyle");

const renderItem = ({ item }) => (
  <DestinationViewImage
    style={[styles.image, appStyles.default.imageListSize]}
    imageUrl={`${IMAGE_BASE_URL}${item}`}
    key={item}
  />
);

const DestinationImageList = (photos_path) => {
  const paths = Object.values(photos_path)[0].split(",");
  console.log(paths);
  const initialImageIndex = Math.floor(paths.length / 2);

  return (
    <View style={styles.container}>
      <FlatList
        initialNumToRender={3}
        initialScrollIndex={initialImageIndex}
        data={paths}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.imageList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    marginLeft: 5,
  },
  imageList: {
    marginLeft: -5,
  },
  image: {
    resizeMode: "stretch",
    borderRadius: 7,
    margin: 8,
  },
});

export default DestinationImageList;
