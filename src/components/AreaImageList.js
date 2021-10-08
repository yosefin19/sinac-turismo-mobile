import React from "react";

import { View, FlatList, StyleSheet } from "react-native";
import AreaViewImage from "./AreaViewImage";

const appStyles = require("../appStyle");

const renderItem = ({ item }) => (
  <AreaViewImage
    style={[styles.image, appStyles.default.imageListSize]}
    imageUrl={item}
    key={item}
  />
);

const AreaImageList = (photos_path) => {
  const paths = Object.values(photos_path)[0].split(",");
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
    marginHorizontal: 8,
  },
});

export default AreaImageList;
