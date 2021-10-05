import React from "react";
import { View, Text, Image, StyleSheet, Platform } from "react-native";
// import { styles } from "styled-system";

import Exit from "../images/exit.png";
import Favorite from "../images/favorite.png";

const ViewImageInformation = ({ name, imageUrl }) => (
  <View style={styles.container}>
    <Image
      style={styles.image}
      // resizeMode="contain"
      source={{ width: 209, height: 125, uri: imageUrl }}
    />
    <View style={styles.favoriteView}>
      <Image style={styles.favoriteImage} source={Favorite} />
    </View>
    <View
      style={[
        styles.nameView,
        Platform.OS === "android"
          ? styles.androidShadowBox
          : styles.iosShadowBox,
      ]}
    >
      <Text style={styles.name}>{name}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    // position: "relative",
    // backgroundColor: "#000",
    // // flex: 0.25,
    // borderRadius: 7,
    // height: "25%",
    // flex: 1,

    // resizeMode: "stretch", //"contain",
    // borderTopLeftRadius: 7,
    // borderTopRightRadius: 7,
    width: 209,
    height: 166,
    // justifyContent: "center",
    marginHorizontal: 10,
    // backgroundColor: "#000",

    // padding: -20,
    // margin: 8,
  },
  favoriteView: {
    position: "absolute",

    width: 31,
    height: 31,
    backgroundColor: "#F0F0F0",
    borderRadius: 60,

    right: 9,
    top: 19,
    // marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteImage: {
    // marginHorizontal: 10,
    // marginVertical: 10,
    width: 17,
    height: 16,
  },
  nameView: {
    position: "absolute",
    borderRadius: 7,
    backgroundColor: "#769F5E",
    // width: 221,
    height: 41,
    width: "105%",
    bottom: 8,
    right: -5,
    padding: 3,
  },
  name: {
    // fontFamily: "Open Sans",
    fontFamily: "Segoe UI",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 16,

    color: "#383837",
  },
  image: {
    // top: -10,
    resizeMode: "stretch",
    // borderRadius: 7,
    borderRadius: 7,
    // borderTopRightRadius: 7,
    // width: "100%",
    // height: "100%",
    // margin: 8,
  },
  iosShadowBox: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  androidShadowBox: {
    elevation: 5, //5
    shadowColor: "#52006A",
  },
});

export default ViewImageInformation;
