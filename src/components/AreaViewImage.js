import React from "react";
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  Platform,
} from "react-native";
// import { styles } from "styled-system";

import No_favorite from "../images/empty_heart.png";
import Seen from "../images/seen.png";

const AreaViewImage = ({ imageUrl }) => {
  console.log("realimageUrl", imageUrl);
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        // resizeMode="contain"
        source={{ width: 375, height: 232, uri: imageUrl }}
      />
      <View style={styles.favoriteView}>
        <Image style={styles.favoriteImage} source={No_favorite} />
      </View>
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

    // resizeMode: "stretch", //"contain",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    width: 365,
    height: 200,
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
  seenView: {
    position: "absolute",

    width: 31,
    height: 31,
    backgroundColor: "#F0F0F0",
    borderRadius: 60,

    right: 9,
    top: 55,
    // marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  seenImage: {
    width: 24.15,
    height: 17.44,
  },
  image: {
    // bottom: 10,
    // flex: 1,
    // resizeMode: "stretch",
    // borderRadius: 7,
    // width: "100%",
    // height: "100%",

    // bottom: 10,
    // flex: 1,
    resizeMode: "stretch",
    // borderRadius: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    width: "100%",
    height: "100%",
    // width: 520,
    // height: 300,
    // borderWidth: 2,
    // borderColor: "#d35647",
    // resizeMode: "contain",
    marginLeft: 5,
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

export default AreaViewImage;
