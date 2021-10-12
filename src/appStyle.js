import {Platform, StatusBar, StyleSheet} from "react-native";

export default StyleSheet.create({
  defaultFont: {
    fontFamily: "Segoe UI",
  },
  appBackgroundColor: {
    backgroundColor: "#F0F0F0",
  },
  name: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 24,

    marginHorizontal: 33,
    marginTop: 10,

    color: "#383837",
  },
  titleText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 9,
    lineHeight: 12,
    marginTop: 5,
    marginBottom: 6,
    marginRight: "auto",

    color: "#383837",
  },
  descriptionText: {
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 12,
    lineHeight: 16,

    color: "#7B7B7B",
  },
  arrowView: {
    position: "absolute",

    width: 31,
    height: 31,
    backgroundColor: "#F0F0F0",
    borderRadius: 60,

    right: 9,
    top: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: {
    width: 17,
    height: 16,
  },
  favoriteView: {
    position: "absolute",

    width: 31,
    height: 31,
    backgroundColor: "#F0F0F0",
    borderRadius: 60,

    right: 9,
    top: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteImage: {
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
    alignItems: "center",
    justifyContent: "center",
  },
  seenImage: {
    width: 24.15,
    height: 17.44,
  },
  exitView: {
    position: "absolute",

    width: 31,
    height: 31,
    backgroundColor: "#F0F0F0",
    borderRadius: 60,
    left: 19,
    top: 19,
    alignItems: "center",
    justifyContent: "center",

    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  exitImage: {
    width: 18.67,
    height: 9.33,
  },
  imageSize: {
    width: 365,
    height: 200,
  },
  imageListSize: {
    width: 520,
    height: 300,
  },
  informativeImageSize: {
    width: 209,
    height: 125,
  },
  informativeImageListSize: {
    width: 209,
    height: 166,
  },
  regionSize: {
    width: 302,
    height: 110,
  },
  horizontalLine: {
    borderWidth: 0.18,
    borderColor: "#000",
    marginVertical: 10,
  },
  androidShadowBox: {
    elevation: 5,
    shadowColor: "#52006A",
    // backgroundColor: "#000",
  },
  iosShadowBox: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
