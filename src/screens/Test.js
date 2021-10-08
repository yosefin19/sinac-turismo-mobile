import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Platform } from "react-native";

import { API_URL, AREAS_URL } from "../config";

const appStyles = require("../appStyle");

export default function Test({ navigation }) {
  const [area, setArea] = useState({});
  const [loading, setLoading] = useState(true);

  const endpoint = `${API_URL}${AREAS_URL}1`;

  useEffect(() => {
    let isMounted = true;
    fetch(endpoint)
      .then((response) => response.json())
      .then((json) => setArea(json))
      .catch((error) => console.error(error))
      .finally(() => {
        isMounted = false;
        setLoading(false);
      });
  }, []);

  try {
    if (!loading) console.log(JSON.parse(JSON.stringify(area)));
  } catch (error) {
    console.log(error);
  }

  return loading ? (
    <View style={{ height: "100%", justifyContent: "center" }}>
      <Text>Cargando...</Text>
    </View>
  ) : (
    <View style={[styles.container, appStyles.default.appBackgroundColor]}>
      <Pressable
        onPress={() => {
          navigation.navigate("Area", { area: area });
        }}
      >
        <Text>Test area with id 1!</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
