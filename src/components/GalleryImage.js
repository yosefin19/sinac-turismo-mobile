import React, { useState, useContext } from "react";
import {
  View,
  ScrollView,
  Pressable,
  Dimensions,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CredentialsContext } from "../CredentialsContext";

let deviceWidth = Dimensions.get("window").width;
import {
  API_URL,
  IMAGE_BASE_URL,
  GALLERY_IMAGE_WIDTH,
  GALLERY_IMAGE_HEIGHT,
} from "../config";

const GalleryImage = ({ route, navigation }) => {
  const [doubleClicked, setDoubleClicked] = useState(false);
  let lastTap = null;

  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const { name } = route.params;

  function onClick(event) {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      setDoubleClicked(!doubleClicked);
    } else {
      lastTap = now;
    }
  }

  const Delete = () => {
    const deleteName = name.split("/");
    const result = Object.keys(deleteName).map((key) => {
      return [key, deleteName[key]];
    });
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + storedCredentials,
      },
    };
    const url = `${API_URL}delete-photo/` + result[result.length - 1][1];

    fetch(url, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.error(error));
    navigation.navigate("MyProfile");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <Pressable onPress={onClick}>
            <Image
              style={[
                styles.image,
                doubleClicked ? { height: "100%" } : { width: deviceWidth },
              ]}
              source={{
                width: GALLERY_IMAGE_WIDTH,
                height: GALLERY_IMAGE_HEIGHT,
                uri: `${IMAGE_BASE_URL}${name}`,
              }}
            />
          </Pressable>
        </ScrollView>
      </View>
      <Pressable style={styles.update} onPress={Delete}>
        <Icon name="delete-sweep" size={21} color={"grey"} />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#DEDEDE",
  },
  update: {
    position: "absolute",
    right: 19,
    width: 31,
    height: 31,
    backgroundColor: "#F0F0F0",
    borderRadius: 60,
    top: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    resizeMode: "contain",
    // height: deviceHeight / 2,
    // width: deviceWidth,
  },
});

export default GalleryImage;
