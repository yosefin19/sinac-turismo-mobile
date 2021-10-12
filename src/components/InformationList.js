import React, { useState } from "react";

import { FlatList, StyleSheet } from "react-native";
import ViewImageInformation from "./ViewImageInformation";

import { IMAGE_BASE_URL } from "../config";

const InformationList = ({ areaDestinations }) => {
  const initialImageIndex = Math.floor(areaDestinations.length / 2);
  const x = initialImageIndex;

  const [state, setState] = useState(initialImageIndex);

  const handleState = (index) => setState(index);
  return (
    <FlatList
      initialNumToRender={3}
      initialScrollIndex={initialImageIndex}
      data={areaDestinations}
      renderItem={({ item, index }) => (
        <ViewImageInformation
          name={item.name}
          imageUrl={`${IMAGE_BASE_URL}destinations/${item.photos_path}`}
          key={index}
        />
      )}
      keyExtractor={(item) => item.id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.informationList}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    borderRadius: 7,

    width: 102,
    height: 56,
  },
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
