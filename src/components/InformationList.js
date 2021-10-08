import React from "react";

import { FlatList, StyleSheet, Pressable } from "react-native";
import ViewImageInformation from "./ViewImageInformation";

import { IMAGE_BASE_URL } from "../config";

const INIT_NUM_TO_RENDER = 3;

const InformationList = ({ areaDestinations, navigation }) => {
  const initialImageIndex = Math.floor(areaDestinations.length / 2);

  return (
    <FlatList
      initialNumToRender={INIT_NUM_TO_RENDER}
      initialScrollIndex={initialImageIndex}
      data={areaDestinations}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            navigation.push("Destination", { destination: item });
          }}
        >
          <ViewImageInformation
            name={item.name}
            imageUrl={`${IMAGE_BASE_URL}${item.photos_path.split(",")[0]}`}
            key={index}
          />
        </Pressable>
      )}
      keyExtractor={(item) => item.id.toString()}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.informationList}
    />
  );
};

const styles = StyleSheet.create({
  informationList: {
    position: "relative",
    paddingHorizontal: 10,
    paddingLeft: 3,
  },
  image: {
    resizeMode: "stretch",
    borderRadius: 7,
    width: 102,
    height: 56,
    margin: 8,
  },
});

export default InformationList;
