import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";

import ConstantMenu from "../components/ConstantMenu";
import AreaImageList from "../components/AreaImageList";
import InformationList from "../components/InformationList";
import AreaRegion from "../components/AreaRegion";

import Exit from "../images/exit.png";

import { API_URL, DESTINATIONS_URL } from "../config";

const Area = ({ route, navigation }) => {
  const { area } = route.params;
  console.log("area", area);
  const id = area.id;
  const name = area.name;
  const description = area.description;
  const photos_path = area.photos_path;
  const region_path = area.region_path;

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const endpoint = API_URL + DESTINATIONS_URL;

  useEffect(() => {
    let isMounted = true;
    fetch(endpoint)
      .then((response) => response.json())
      .then((json) => {
        const data = json.filter((item) => item.area_id === id);
        if (isMounted) setDestinations(data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        isMounted = false;
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      {loading ? null : <AreaImageList photos_path={photos_path} />}
      <View style={styles.exitView}>
        <Image style={styles.exitImage} source={Exit} />
      </View>
      <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.scrollableContainer}>
          <ScrollView>
            <Text style={styles.descriptionText}>{description}</Text>
          </ScrollView>
        </View>
        <View style={{ alignItems: "center" }}>
          <AreaRegion imageUrl={region_path} />
        </View>

        <Text style={styles.titleText}>Áreas Silvestres Protegidas</Text>
        <View>
          {loading ? null : (
            <InformationList
              areaDestinations={destinations}
              navigation={navigation}
            />
          )}
        </View>
      </View>
      <ConstantMenu />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    width: "100%",
    height: "100%",

    backgroundColor: "#F0F0F0",
    justifyContent: "center",
  },
  container: {
    flex: 0.99,
  },
  exitView: {
    position: "absolute",

    width: 31,
    height: 31,
    backgroundColor: "#F0F0F0",
    borderRadius: 60,
    left: 19,
    top: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  exitImage: {
    width: 18.67,
    height: 9.33,
  },
  name: {
    fontFamily: "Segoe UI",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 24,

    marginHorizontal: 33,
    marginTop: 20, //20,

    color: "#383837",
  },
  titleText: {
    fontFamily: "Segoe UI",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 9,
    lineHeight: 12,

    marginHorizontal: 33,
    marginTop: 16,
    marginBottom: 6,

    color: "#383837",
  },
  descriptionText: {
    fontFamily: "Segoe UI",
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 12,
    lineHeight: 16,

    color: "#7B7B7B",
  },
  scrollableContainer: {
    height: 62,
    paddingHorizontal: 33,
    marginTop: 8,
    marginBottom: 5,
  },
});

export default Area;
