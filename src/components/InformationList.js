import React, { useRef } from "react";
import { FlatList, Text, StyleSheet, Pressable } from "react-native";

// Componentes
import ViewImageInformation from "./ViewImageInformation";

// Configuración
import { IMAGE_BASE_URL } from "../config";

// Estilos globales
const appStyles = require("../appStyle");

const INIT_NUM_TO_RENDER = 3;

/***
 * Lista de destinos turísticos presentes en un área
 * @param areaDestinations Destinos de un área de conservación
 * @param navigation Pila para el manejo de ventanas
 * @returns {JSX.Element}
 */
const InformationList = ({ destinations, navigation, isArea }) => {
  const initialImageIndex = Math.floor(destinations.length / 2);
  const flatList = useRef(null);

  return (
    <FlatList
      ref={flatList}
      initialNumToRender={INIT_NUM_TO_RENDER}
      initialScrollIndex={initialImageIndex}
      onScrollToIndexFailed={(info) => {
        const wait = new Promise((resolve) => setTimeout(resolve, 500));
        wait.then(() => {
          flatList.current?.scrollToIndex({
            index: initialImageIndex,
            animated: true,
          });
        });
      }}
      data={destinations}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            isArea
              ? navigation.push("Area", { area: item })
              : navigation.push("Destination", { destination: item });
          }}
        >
          <ViewImageInformation
            id={item.id}
            name={item.name}
            imageUrl={`${IMAGE_BASE_URL}${item.photos_path.split(",")[0]}`}
            key={index}
            style={{ marginLeft: 50 }}
            isArea={isArea}
          />
        </Pressable>
      )}
      ListEmptyComponent={() => (
        <Text
          style={[
            { padding: 10, color: "#7B7B7B" },
            appStyles.default.defaultFont,
          ]}
        >
          {isArea ? "Ningún área coincide" : "Ningún destino coincide"}
        </Text>
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
