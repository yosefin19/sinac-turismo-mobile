import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Dimensions,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import FA from "react-native-vector-icons/FontAwesome";

// Configuración
import {
  API_URL,
  AREAS_URL,
  DESTINATIONS_URL,
  FIRST_PERCENTAGE,
} from "../config";

// Componentes
import ConstantMenu from "../components/ConstantMenu";
import TagsFilter from "../components/TagsFilter";
import InformationList from "../components/InformationList";

// Estilos globales
const appStyles = require("../appStyle");

/***
 * Pantalla que muestra información referente a las áreas de conservación y destinos
 * turísticos registrados en la aplicación.
 * @param navigation Pila para el manejo de ventanas
 * @returns {JSX.Element}
 */
const InformationSection = ({ navigation }) => {
  const [areas, setAreas] = useState({});
  const [seasonDestinations, setSeasonDestinations] = useState([]);

  const [loadingArea, setLoadingArea] = useState(true);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState([]);

  const [loadingDestinations, setLoadingDestinations] = useState(true);

  const [beachTag, setBeachTag] = useState(false);
  const [mountainTag, setMountainTag] = useState(false);
  const [volcanoTag, setVolcanoTag] = useState(false);
  const [forestTag, setForestTag] = useState(false);
  const [onClick, setOnClick] = useState(false);

  const [filterResult, setFilterResult] = useState([]);

  const areas_endpoint = `${API_URL}${AREAS_URL}`;
  const destination_endpoint = `${API_URL}${DESTINATIONS_URL}season/`;

  useEffect(() => {
    let isMounted = true;
    fetch(areas_endpoint)
      .then((response) => response.json())
      .then((json) => {
        if (isMounted) setAreas(json);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoadingArea(false);
        isMounted = false;
      });
  }, []);

  const endpoint = API_URL + DESTINATIONS_URL;

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
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

  // useEffect(() => {
  //   let isMounted = true;
  //   setLoading(true);
  //   setDestinations([
  //     {
  //       name: "Test1",
  //       is_beach: true,
  //       is_forest: true,
  //       is_volcano: true,
  //       is_mountain: true,
  //     },
  //     {
  //       name: "Test2",
  //       is_beach: true,
  //       is_forest: false,
  //       is_volcano: true,
  //       is_mountain: true,
  //     },
  //     {
  //       name: "Test3",
  //       is_beach: true,
  //       is_forest: true,
  //       is_volcano: false,
  //       is_mountain: true,
  //     },
  //     {
  //       name: "Test4",
  //       is_beach: true,
  //       is_forest: true,
  //       is_volcano: true,
  //       is_mountain: false,
  //     },
  //     {
  //       name: "Test5",
  //       is_beach: true,
  //       is_forest: false,
  //       is_volcano: true,
  //       is_mountain: true,
  //     },
  //     {
  //       name: "Test6",
  //       is_beach: true,
  //       is_forest: true,
  //       is_volcano: false,
  //       is_mountain: true,
  //     },
  //     {
  //       name: "Test7",
  //       is_beach: true,
  //       is_forest: true,
  //       is_volcano: true,
  //       is_mountain: false,
  //     },
  //     {
  //       name: "Test8",
  //       is_beach: true,
  //       is_forest: false,
  //       is_volcano: false,
  //       is_mountain: true,
  //     },
  //     {
  //       name: "Test9",
  //       is_beach: true,
  //       is_forest: false,
  //       is_volcano: true,
  //       is_mountain: false,
  //     },
  //     {
  //       name: "Test10",
  //       is_beach: true,
  //       is_forest: true,
  //       is_volcano: false,
  //       is_mountain: false,
  //     },
  //     {
  //       name: "Test11",
  //       is_beach: true,
  //       is_forest: false,
  //       is_volcano: true,
  //       is_mountain: true,
  //     },
  //     {
  //       name: "Test12",
  //       is_beach: true,
  //       is_forest: false,
  //       is_volcano: true,
  //       is_mountain: true,
  //     },
  //   ]);
  //   setLoading(false);
  // }, []);

  useEffect(() => {
    let isMounted = true;
    let month = new Date().getMonth() + 1;
    fetch(destination_endpoint + month)
      .then((response) => response.json())
      .then((json) => setSeasonDestinations(json))
      .catch((error) => console.error(error))
      .finally(() => {
        setLoadingDestinations(false);
        isMounted = false;
      });
  }, []);

  const filterItems = (beachTag, mountainTag, volcanoTag, forestTag) => {
    const newData = destinations.filter((item) => {
      return (
        (!beachTag || item.is_beach) &&
        (!mountainTag || item.is_mountain) &&
        (!volcanoTag || item.is_volcano) &&
        (!forestTag || item.is_forest)
      );
    });
    setFilterResult(newData);
  };

  useEffect(() => {
    if (!beachTag && !mountainTag && !volcanoTag && !forestTag) {
      setFilterResult([]);
      setOnClick(false);
    } else {
      setOnClick(true);
      filterItems(beachTag, mountainTag, volcanoTag, forestTag);
    }
  }, [beachTag, mountainTag, volcanoTag, forestTag]);

  const handleExitClick = () => {
    setOnClick(false);
    setBeachTag(false);
    setMountainTag(false);
    setVolcanoTag(false);
    setForestTag(false);
    setFilterResult([]);
  };

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  return (
    <SafeAreaView
      style={[styles.safeContainer, appStyles.default.appBackgroundColor]}
    >
      <View style={[styles.title, styles.nameContainer]}>
        {onClick && (
          <Pressable style={styles.backButton} onPressIn={handleExitClick}>
            <FA name={"long-arrow-left"} style={styles.icon} />
          </Pressable>
        )}
        <Text style={[styles.titleText, appStyles.default.defaultFont]}>
          Destinos de Costa Rica
        </Text>
      </View>
      <View>
        <TagsFilter
          beachTag={beachTag}
          setBeachTag={setBeachTag}
          mountainTag={mountainTag}
          setMountainTag={setMountainTag}
          volcanoTag={volcanoTag}
          setVolcanoTag={setVolcanoTag}
          forestTag={forestTag}
          setForestTag={setForestTag}
          setOnClick={setOnClick}
        />
        {beachTag || mountainTag || volcanoTag || forestTag ? (
          <View
            style={{
              // flex: 1,
              // flexGrow: 1,
              paddingVertical: 5,
              paddingHorizontal: 15,
              margin: 10,
              width: "98%",
              height: Dimensions.get("window").height, // * FIRST_PERCENTAGE//"100%",

              alignSelf: "center",
              justifyContent: "center",
              position: "absolute",
              backgroundColor: "#F0F0F0",
              // borderColor: "#000",
              // borderWidth: 2,
              zIndex: 10,
              top: 140,
              // maxHeight: "70%",
            }}
          >
            <FlatList
              style={{ flexGrow: 1 }}
              contentContainerStyle={{ flexGrow: 1 }}
              data={filterResult}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    navigation.push("Destination", { destination: item });
                  }}
                >
                  <Text style={{ padding: 10 }}>{item.name} </Text>
                </Pressable>
              )}
              keyExtractor={(item) => item.name}
              ItemSeparatorComponent={renderSeparator}
              ListEmptyComponent={() => (
                <Text
                  style={[
                    { padding: 10, color: "#7B7B7B" },
                    appStyles.default.defaultFont,
                  ]}
                >
                  Ningún destino coincide
                </Text>
              )}
            />
          </View>
        ) : null}
      </View>
      <View style={styles.listInformationContainer}>
        <Text
          style={[styles.listInformationText, appStyles.default.defaultFont]}
        >
          Áreas de Conservación
        </Text>
        {loadingArea ? (
          <ActivityIndicator
            animating={true}
            size={"large"}
            color={"rgba(118, 159, 94, 0.6)"}
          />
        ) : (
          <InformationList
            destinations={areas}
            navigation={navigation}
            isArea={true}
          />
        )}
      </View>
      <View style={styles.listInformationContainer}>
        <Text
          style={[styles.listInformationText, appStyles.default.defaultFont]}
        >
          Lugares de Temporada
        </Text>
        {loadingDestinations ? (
          <ActivityIndicator
            animating={true}
            size={"large"}
            color={"rgba(118, 159, 94, 0.6)"}
          />
        ) : (
          <InformationList
            destinations={seasonDestinations}
            navigation={navigation}
            isArea={false}
          />
        )}
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: FIRST_PERCENTAGE,
          width: "100%",
        }}
      >
        <ConstantMenu navigation={navigation} />
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
  nameContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    marginTop: "18%",
    alignContent: "flex-start",
    width: "80%",
  },
  titleText: {
    textAlign: "left",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 24,
    color: "#605F5F",
  },
  listInformationText: {
    fontStyle: "normal",
    fontWeight: "900",
    fontSize: 16,
    lineHeight: 22,
    color: "#383837",
    marginLeft: "8%",
    marginBottom: "3%",
  },
  listInformationContainer: {
    width: "95%",
    flex: 1,
    marginBottom: "5%",
    marginTop: "5%",
  },
  backButton: {
    height: 24,
    width: 24,
    backgroundColor: "#E7E7E7",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderColor: "rgba(0, 0, 0, 0.25)",
    borderWidth: 1,
    marginRight: 10,
  },
  icon: {
    marginLeft: 6,
    marginRight: 7,
    fontSize: 20,
  },
});

export default InformationSection;
