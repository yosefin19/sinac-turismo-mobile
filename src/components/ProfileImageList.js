import React from "react";
import { FlatList, StyleSheet, Pressable } from "react-native";

// Componentes
import ViewFavoriteInformation from "./ViewFavoriteInformation";

// Configuración
import { IMAGE_BASE_URL } from "../config";

const INIT_NUM_TO_RENDER = 3;

/***
 * Lista de destinos turísticos marcados como favoritos o visitados y
 * áreas de conservación marcadas como favoritas.
 * @param areas Áreas de conservación marcadas como favoritas.
 * @param destinations Destinos marcados como favoritos o visitados.
 * @param isFavorite Booleano que indica si estamos procesando favoritos o
 *                   visitados.
 * @param navigation Pila para el manejo de ventanas
 * @returns {JSX.Element}
 */
const ProfileImageList = ({ areas, destinations, isFavorite, navigation }) => {
  let informationList = areas.map((item) => [item, true]);
  informationList.push(...destinations.map((item) => [item, false]));

  return (
    <FlatList
      initialNumToRender={INIT_NUM_TO_RENDER}
      data={informationList}
      renderItem={({ item, index }) => {
        current = item[0];
        isArea = item[1];
        return (
          <Pressable
            onPress={() => {
              isArea
                ? navigation.push("Area", { area: item[0] })
                : navigation.push("Destination", { destination: item[0] });
            }}
          >
            <ViewFavoriteInformation
              name={current.name}
              imageUrl={
                current.photos_path.split(",")[0]
                  ? `${IMAGE_BASE_URL}${current.photos_path.split(",")[0]}`
                  : ""
              }
              id={current.id}
              isArea={isArea}
              isVisited={isFavorite}
              key={`${index}-${isFavorite}`}
              style={{ marginLeft: 50 }}
            />
          </Pressable>
        );
      }}
      keyExtractor={(item) => `${item[0].id}-${item[1]}`}
      showsHorizontalScrollIndicator={false}
      style={styles.informationList}
    />
  );
};

const styles = StyleSheet.create({
  informationList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  image: {
    borderRadius: 7,
    margin: 8,
  },
});

export default ProfileImageList;
