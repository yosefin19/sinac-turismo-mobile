import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Pressable,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { CredentialsContext } from "../CredentialsContext";
import { IMAGE_BASE_URL } from "../config";
import IconA from "react-native-vector-icons/AntDesign";
let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;
import { API_URL } from "../config";

const GalleryList = ({ navigation }) => {
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const [photos_path, setPath] = useState("");
  const [isMountedG, setMounted] = useState(false);

  const getGallery = () => {
    const endpointGallery = API_URL + "gallery";
    const requestOptionsGallery = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + storedCredentials,
      },
    };
    fetch(endpointGallery, requestOptionsGallery)
      .then((response) => response.json())
      .then((data) => {
        setMounted(false);
        if (data.photos_path !== "/") {
          const paths = data.photos_path.split(",");
          setPath(paths);
          setMounted(true);
        }
      })
      .catch((error) => console.error(error));
    
  };

  useEffect(() => {
    getGallery();
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Debe asignar permisos si desea agregar fotos de su galeria");
        }
      }
    })();
  }, []);

  //Funcion que permite seleccionar una foto y posteriormente actualizar
  //la foto de perfil del perfil de usuario con la seleccionada
  const agregar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      const endpoint = API_URL + `add-photo`;

      let localUri = result.uri;
      let filename = localUri.split("/").pop();
      let match = /.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      let formData = new FormData();
      formData.append("photos", { uri: localUri, name: filename, type });

      const requestOptions = {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + storedCredentials,
        },
      };

      fetch(endpoint, requestOptions)
        .then((response) => response.json())

        .catch((error) => console.error(error));
    }
    getGallery();
  };

  return isMountedG ? (
    <View style={styles.container}>
      {photos_path.map((image, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate("GalleryImage", { name: image })}
        >
          <Image
            source={{ uri: `${IMAGE_BASE_URL}${image}` }}
            style={styles.image}
          />
        </TouchableOpacity>
      ))}
      <Pressable style={styles.update} onPress={agregar}>
        <IconA name="plus" size={21} color={"grey"} />
      </Pressable>
    </View>
  ) : (
    <View style={styles.containerV}>
      <Pressable style={styles.void} onPress={agregar}>
        <IconA name="plus" size={21} color={"grey"} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  containerV: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    height: 50,
  },
  imageList: {
    marginLeft: -2,
  },

  image: {
    height: deviceHeight / 4,
    width: deviceWidth / 2 - 24,
    borderRadius: 10,
    margin: 5,
  },
  update: {
    position: "absolute",
    right: 19,
    width: 40,
    height: 40,
    backgroundColor: "#769E5F",
    borderRadius: 60,
    bottom: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  void: {
    position: "absolute",
    right: 19,
    width: 40,
    height: 40,
    backgroundColor: "#769E5F",
    borderRadius: 60,
    bottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    color: "grey",
  },
});

export default GalleryList;
