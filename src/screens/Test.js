// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { API_URL } from "../config";

export default function Test({ navigation }) {
  const [area, setArea] = useState({});
  const [loading, setLoading] = useState(true);

  const endpoint = `${API_URL}`;

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
    if (!loading) console.log(JSON.parse(JSON.stringify(area.name)));
  } catch (error) {
    console.log(error);
  }

  return loading ? (
    <View style={{ height: "100%", justifyContent: "center" }}>
      <Text>Cargando...</Text>
    </View>
  ) : (
    <View style={{ alignItems: "center" }}>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
