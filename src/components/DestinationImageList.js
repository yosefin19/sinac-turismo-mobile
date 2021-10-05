import React, { useState } from "react";

import {
  Image,
  View,
  ScrollView,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  ItemSeparatorComponent,
} from "react-native";
import DestinationViewImage from "./DestinationViewImage";

import { IMAGE_BASE_URL } from "../config";

const renderItem = ({ item }) => (
  <DestinationViewImage
    style={styles.image}
    imageUrl={`${IMAGE_BASE_URL}destinations/${item}`}
    key={item}
  />
);

const DestinationImageList = (photos_path) => {
  const paths = Object.values(photos_path);
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
    // position: "relative",
    // backgroundColor: "#000",
    // // flex: 0.25,
    // borderRadius: 7,
    // height: "25%",
    top: 0,
  },
  imageList: {
    // position: "relative",
    marginLeft: -5,

    // height: ;
    // paddingBottom: 10,
    // backgroundColor: "#000",
    // flex: 1,
    // marginRight: 10,
    // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  image: {
    // bottom: 10,
    // flex: 1,
    resizeMode: "stretch",
    borderRadius: 7,
    // width: "100%",
    // height: "20%",
    width: 520,
    height: 300,
    // borderWidth: 2,
    // borderColor: "#d35647",
    // resizeMode: "contain",
    margin: 8,
  },
  iosShadowBox: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  androidShadowBox: {
    elevation: 5,
    shadowColor: "#52006A",
  },
});

export default DestinationImageList;
