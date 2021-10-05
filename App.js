import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import { API_URL, AREAS_URL } from "../config";

export default function App() {
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

  return <Area area={area} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
