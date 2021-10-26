import { Dimensions, StyleSheet } from "react-native";

import { REGION_IMAGE_WIDTH, REGION_IMAGE_HEIGHT } from "./config";

const image_height = Dimensions.get("window").height;
const image_width =
  REGION_IMAGE_WIDTH * (Dimensions.get("window").height / REGION_IMAGE_HEIGHT);

export default StyleSheet.create({
  regionImage: {
    height: image_height,
    width: image_width,
  },
  defaultFont: {
    fontFamily: "Open Sans",
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
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.2)",
    marginVertical: 10,
  },
  androidShadowBox: {
    elevation: 4,
    shadowColor: "#52006A",
  },
  iosShadowBox: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
