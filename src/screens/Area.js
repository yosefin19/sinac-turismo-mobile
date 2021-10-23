import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  Platform,
  Dimensions, Pressable,
} from "react-native";

// Componentes
import ConstantMenu from "../components/ConstantMenu";
import AreaImageList from "../components/AreaImageList";
import InformationList from "../components/InformationList";
import AreaRegion from "../components/AreaRegion";

// Imagenes
import Exit from "../images/exit.png";

// Configuración
import {
  API_URL,
  DESTINATIONS_URL,
  FIRST_PERCENTAGE,
  SECOND_PERCENTAGE,
  THIRD_PERCENTAGE,
  TEXT_CONTAINER_PERCENTAGE, AREAS_URL,
} from "../config";

// Estilos globales
const appStyles = require("../appStyle");

// Altura del contenedor de la descripción del texto
const description_height =
  Dimensions.get("window").height * TEXT_CONTAINER_PERCENTAGE;

/***
 * Pantalla que muestra la información de un área de conservación
 * @param route Almacena la información del área
 * @param navigation Pila para el manejo de ventanas
 * @returns {JSX.Element}
 */
const Area = ({ route, navigation }) => {
  const { area } = route.params;
  const id = area.id;
  const name = area.name;
  const description = area.description;
  const photos_path = area.photos_path;
  const region_path = area.region_path;

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const endpoint = API_URL + DESTINATIONS_URL + AREAS_URL + id;

  useEffect(() => {
    let isMounted = true;
    fetch(endpoint)
      .then((response) => response.json())
      .then((json) => {
        if (isMounted) setDestinations(json);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        isMounted = false;
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView
      style={[styles.safeContainer, appStyles.default.appBackgroundColor]}
    >
      <View
        style={[
          {
            alignItems: "center",
            justifyContent: "center",
            flex: FIRST_PERCENTAGE,
          },
          Platform.OS === "android"
            ? appStyles.default.androidShadowBox
            : appStyles.default.iosShadowBox,
          {
            elevation: 30,
            backgroundColor: "rgba(0,0,0,0.5)",
          },
        ]}
      >
        {loading ? null : <AreaImageList photos_path={photos_path} />}
      </View>
      <View style={[appStyles.default.exitView, { elevation: 31 }]}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image style={appStyles.default.exitImage} source={Exit} />
        </Pressable>
      </View>
      <View style={styles.container}>
        <View>
          <Text style={[appStyles.default.name, appStyles.default.defaultFont]}>
            {name}
          </Text>
          <View style={styles.scrollableContainer}>
            <ScrollView>
              <Text
                style={[
                  appStyles.default.descriptionText,
                  appStyles.default.defaultFont,
                ]}
              >
                {description}
              </Text>
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            height: "30%",
            paddingHorizontal: 30,
          }}
        >
          <AreaRegion imageUrl={region_path} navigation={navigation} />
        </View>
        <View
          style={{
            flex: 1,
            marginBottom: 10,
          }}
        >
          <Text
            style={[
              appStyles.default.titleText,
              appStyles.default.defaultFont,
              { marginLeft: 20 },
            ]}
          >
            Áreas Silvestres Protegidas
          </Text>
          {loading ? null : (
            <InformationList
                destinations={destinations}
                isArea={false}
              navigation={navigation}
            />
          )}
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: THIRD_PERCENTAGE,
          width: "100%",
        }}
      >
        <ConstantMenu />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: SECOND_PERCENTAGE,
    height: "100%",
    width: "100%",
  },
  scrollableContainer: {
    height: description_height,
    paddingHorizontal: 33,
    marginVertical: 8,
  },
});

export default Area;
