import React, { useRef } from "react";

import { View, FlatList, StyleSheet, Pressable } from "react-native";

// Componentes
import AreaViewImage from "./AreaViewImage";

// Estilos globales
const appStyles = require("../appStyle");

/***
 * Lista de imágenes de un área de conservación
 * @param photos_path Lista de direcciones de imágenes
 * @returns {JSX.Element}
 */
const AreaImageList = ({ areaId, photos_path }) => {
  // Referencia para utilizar "scrollToIndex"
  const myRef = useRef(null);

  let paths;
  if (photos_path !== undefined) {
    paths = photos_path.split(",");
  } else {
    paths = [""];
  }

  const initialImageIndex = Math.floor(paths.length / 2);

  return (
    <View style={styles.container}>
      <FlatList
        initialNumToRender={3}
        initialScrollIndex={initialImageIndex}
        data={paths}
        ref={myRef}
        renderItem={({ item, index }) => {
          const scroll = () =>
            myRef.current.scrollToIndex({ animated: true, index: index });
          return (
            <Pressable onPress={scroll}>
              <AreaViewImage
                style={[styles.image, appStyles.default.imageListSize]}
                imageUrl={item}
                areaId={areaId}
                key={item}
              />
            </Pressable>
          );
        }}
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
    top: 0,
    marginLeft: 5,
  },
  imageList: {
    marginLeft: -5,
  },
  image: {
    resizeMode: "stretch",
    borderRadius: 7,
    marginHorizontal: 8,
  },
});

export default AreaImageList;
