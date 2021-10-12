// import { defaultConfig } from "native-base/lib/typescript/core/NativeBaseContext";
import React from "react";

import { Image, View, StyleSheet, Platform } from "react-native";

import Arrow from "../images/arrow.png";

import { IMAGE_BASE_URL } from "../config";

const AreaRegion = ({ imageUrl }) => (
  <View
    style={[
      styles.container,
      Platform.OS === "android" ? styles.androidShadowBox : styles.iosShadowBox,
    ]}
  >
    <Image
      style={styles.region}
      source={{
        width: 375,
        height: 232,
        uri: `${IMAGE_BASE_URL}regions/${imageUrl}`,
      }}
    />
    <View style={styles.arrowView}>
      <Image style={styles.arrow} source={Arrow} />
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

    resizeMode: "stretch", //"contain",
    // borderTopLeftRadius: 7,
    // borderTopRightRadius: 7,
    width: 302,
    height: 110,
    // justifyContent: "center",
    // alignContent: "center",
    marginHorizontal: 10,

    // padding: -20,
    // margin: 8,
  },
  region: {
    resizeMode: "stretch",
    // borderRadius: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    width: 302,
    height: 100,
    // width: "100%",
    // height: "100%",
    // margin: 8,
  },
  arrowView: {
    position: "absolute",

    width: 31,
    height: 31,
    backgroundColor: "#F0F0F0",
    borderRadius: 60,

    right: 9,
    top: 10,
    // marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: {
    // marginHorizontal: 10,
    // marginVertical: 10,
    width: 17,
    height: 16,
  },
  iosShadowBox: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  androidShadowBox: {
    elevation: 1000000000000,
    shadowColor: "#769F5E",
  },
});

export default AreaRegion;
