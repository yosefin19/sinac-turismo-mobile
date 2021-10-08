import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";

import ConstantMenu from "../components/ConstantMenu";
import AreaImageList from "../components/AreaImageList";
import InformationList from "../components/InformationList";
import AreaRegion from "../components/AreaRegion";

import Exit from "../images/exit.png";

import {
  API_URL,
  DESTINATIONS_URL,
  FIRST_PERCENTAGE,
  SECOND_PERCENTAGE,
  THIRD_PERCENTAGE,
} from "../config";

const appStyles = require("../appStyle");

const Area = ({ route, navigation }) => {
  const { area } = route.params;
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
        const data = json.filter((item) => item.conservation_area_id === id);
        if (isMounted) setDestinations(data);
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
            marginBottom: 10,
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
        <Image style={appStyles.default.exitImage} source={Exit} />
      </View>
      <View style={styles.container}>
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
        <View style={{ alignItems: "center" }}>
          <AreaRegion imageUrl={region_path} navigation={navigation} />
        </View>
        <View
          style={{
            marginLeft: 20,
          }}
        >
          <Text
            style={[appStyles.default.titleText, appStyles.default.defaultFont]}
          >
            Áreas Silvestres Protegidas
          </Text>
        </View>
        {/* <View> */}
        {loading ? null : (
          <InformationList
            areaDestinations={destinations}
            navigation={navigation}
          />
        )}
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    justifyContent: "center",
    flex: SECOND_PERCENTAGE,
    height: "100%",
    width: "100%",
  },
  scrollableContainer: {
    height: 62,
    paddingHorizontal: 33,
    marginTop: 8,
    marginBottom: 5,
  },
});

export default Area;
