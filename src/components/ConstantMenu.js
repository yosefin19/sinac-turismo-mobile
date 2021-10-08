import React from "react";
import { View, StyleSheet } from "react-native";

// Image
import Home from "../images/home.png";
import Favorite from "../images/favorite.png";
import Person from "../images/person.png";

// Components
import Icon from "./Icon";

const appStyles = require("../appStyle");

const ConstantMenu = () => (
  <View style={styles.wrapper}>
    <View style={appStyles.default.horizontalLine} />
    <View style={styles.horizontalWrapper}>
      <Icon text="inicio" imageUrl={Home} width={19.65} height={20.72} />
      <Icon text="favoritos" imageUrl={Favorite} width={21.49} height={19.72} />
      <Icon text="perfil" imageUrl={Person} width={23.33} height={23.33} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    bottom: 0,

    marginHorizontal: 20,
    marginVertical: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  horizontalWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default ConstantMenu;
