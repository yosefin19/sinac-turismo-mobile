import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import {
  API_URL,
  AREAS_URL,
  DESTINATIONS_URL,
  FIRST_PERCENTAGE,
} from "../config";
import { ActivityIndicator } from "react-native-paper";
import ConstantMenu from "../components/ConstantMenu";
import TagsFilter from "../components/TagsFilter";
import InformationList from "../components/InformationList";

const appStyles = require("../appStyle");

const InformationSection = ({ navigation }) => {
  const [areas, setAreas] = useState({});
  const [seasonDestinations, setSeasonDestinations] = useState([]);

  const [loadingArea, setLoadingArea] = useState(true);
  const [loadingDestinations, setLoadingDestinations] = useState(true);

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
              zIndex: 10,
              top: 140,
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
      <TagsFilter />
      <View style={styles.listInformationContainer}>
        <Text style={styles.listInformationText}>Áreas de Conservación</Text>
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
        <Text style={styles.listInformationText}>Lugares de Temporada</Text>
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
  title: {
    marginTop: "18%",
    alignContent: "flex-start",
    width: "80%",
  },
  titleText: {
    textAlign: "left",
    fontFamily: "Segoe UI",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 24,
    color: "#605F5F",
  },
  listInformationText: {
    fontFamily: "Segoe UI",
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
});

export default InformationSection;
