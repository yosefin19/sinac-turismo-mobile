import React from "react";
import { FlatList, StyleSheet, Pressable } from "react-native";

// Componentes
import ViewImageInformation from "./ViewImageInformation";

// Configuración
import { IMAGE_BASE_URL } from "../config";

const INIT_NUM_TO_RENDER = 3;

/***
 * Lista de destinos turísticos presentes en un área
 * @param areaDestinations Destinos de un área de conservación
 * @param navigation Pila para el manejo de ventanas
 * @returns {JSX.Element}
 */
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
            id={item.id}
            name={item.name}
            imageUrl={`${IMAGE_BASE_URL}${item.photos_path.split(",")[0]}`}
            key={index}
            style={{ marginLeft: 50 }}
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
    height: "100%",
    width: "100%",
    flex: 1,
    paddingHorizontal: 10,
    paddingLeft: 3,
  },
  image: {
    borderRadius: 7,
    margin: 8,
  },
});

export default InformationList;
