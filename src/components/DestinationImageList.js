import React, { useRef } from "react";
import { View, FlatList, Pressable, StyleSheet } from "react-native";

// Componentes
import DestinationViewImage from "./DestinationViewImage";

// Configuración
import { IMAGE_BASE_URL } from "../config";

// Estilos globales
const appStyles = require("../appStyle");

/***
 * Lista de imágenes de un destino turístico
 * @param photos_path Lista de direcciones de imágenes
 * @returns {JSX.Element}
 */
const DestinationImageList = (photos_path) => {
  const myRef = useRef(null);

  const paths = Object.values(photos_path)[0].split(",");
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
              <DestinationViewImage
                style={[styles.image, appStyles.default.imageListSize]}
                imageUrl={`${IMAGE_BASE_URL}${item}`}
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
    margin: 8,
  },
});

export default DestinationImageList;
