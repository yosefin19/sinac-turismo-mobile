import React from "react";
import { View, StyleSheet } from "react-native";

// import PropTypes from "prop-types";

// Image
import NoImage from "../images/no_image.png";
import Home from "../images/home.png";
import Favorite from "../images/favorite.png";
import Person from "../images/person.png";

// Components
import Icon from "./Icon";

// Styles
// import {
//   Wrapper,
//   HorizontalWrapper,
//   HorizontalLine,
// } from "./ConstantMenu.styles";

const ConstantMenu = () => (
  <View style={styles.wrapper}>
    <View style={styles.horizontalLine} />
    <View style={styles.horizontalWrapper}>
      <Icon text="inicio" imageUrl={Home} width={19.65} height={20.72} />
      <Icon text="favoritos" imageUrl={Favorite} width={21.49} height={19.72} />
      <Icon text="perfil" imageUrl={Person} width={23.33} height={23.33} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    // position: "absolute",
    // right: 0,
    bottom: 0,

    marginHorizontal: 20,
    marginVertical: 20,
    // right: 100,
    // width: "100%",
    // position: "absolute",
    // bottom: 0.5,
  },
  horizontalLine: {
    borderWidth: 0.18,
    borderColor: "#000",
    marginVertical: 10,
  },
  horizontalWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // paddingHorizontal: 2,
    // paddingVertical: 2,
  },
});

export default ConstantMenu;
