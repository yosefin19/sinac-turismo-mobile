import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

// Autenticación
import { CredentialsContext } from "../CredentialsContext";

// Imagenes
import Exit from "../images/exit.png";
import Star from "../images/black_star.png";
import Filled_star from "../images/filled_green_star.png";
import NoProfile from "../images/no_profile.png";

// Configuración
import {
  API_URL,
  DESTINATIONS_URL,
  IMAGE_BASE_URL,
  USERS_URL,
  PROFILE_URL,
  PROFILES_URL,
  USER_REVIEW_URL,
  REVIEWS_URL,
  ALL_URL,
  PROFILE_PHOTO_IMAGE_WIDTH,
  PROFILE_PHOTO_IMAGE_HEIGHT,
  REVIEW_IMAGE_WIDTH,
  REVIEW_IMAGE_HEIGHT,
  IMAGE_IN_REVIEW_PERCENTAGE,
} from "../config";

// Dimensiones de la imagen
const image_height =
  Dimensions.get("window").height * IMAGE_IN_REVIEW_PERCENTAGE;

// Estilos globales
const appStyles = require("../appStyle");

/***
 * Pantalla que con el formulario para registrar una opinión de usuario.
 * @param route Almacena la información sobre el identificador del destino
 *              sobre el que se opinará y la cantidad de estrellas tocadas
 *              por el usuario.
 * @param navigation Pila para el manejo de ventanas
 * @returns {JSX.Element}
 */
const ReviewForm = ({ route, navigation }) => {
  const { destination_id, clickedCalification } = route.params;

  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const [profile, setProfile] = useState([]);
  const [calification, setCalification] = useState(clickedCalification);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const [loading, setLoading] = useState(true);

  const profileEndpoint = `${API_URL}${USERS_URL}${ALL_URL}auth-profiles/`;

  const requestOptionsUser = {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Authorization: "Bearer " + storedCredentials,
    },
  };

  useEffect(() => {
    let isMounted = true;
    fetch(profileEndpoint, requestOptionsUser)
      .then((response) => response.json())
      .then((json) => {
        if (isMounted) setProfile(json);
      })
      .catch((error) => console.error(error))
      .finally(() => (isMounted = false));
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

  const reviewEndpoint = `${API_URL}${DESTINATIONS_URL}${destination_id}/${USER_REVIEW_URL}`;

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch(reviewEndpoint, requestOptionsUser)
      .then((response) => response.json())
      .then((json) => {
        if (isMounted) {
          if (json.calification) {
            setCalification(json.calification);
            setTitle(json.title ? json.title : "");
            setText(json.text ? json.text : "");
            setImage(json.image_path);
            setIsUpdate(true);
          }
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        isMounted = false;
        setLoading(false);
      });
  }, []);

  const addReview = async () => {
    if (calification === 0) {
      alert("Debe indicar una calificación");
    } else {
      let image_path = "";

      if (image !== null) {
        if (image.uri !== undefined) {
          let imageFormData = new FormData();
          imageFormData.append("image", {
            name: image.name,
            type: image.type,
            uri: image.uri,
          });

          const addReviewImage = `${API_URL}${DESTINATIONS_URL}${destination_id}/review-image`;

          const requestOptions = {
            method: "POST",
            headers: {
              // "Content-Type": "application/json",
              Authorization: "Bearer " + storedCredentials,
            },
            mimeType: "multipart/form-data",
            body: imageFormData,
          };
          await fetch(addReviewImage, requestOptions)
            .then((response) => response.json())
            .then((res) => (image_path = res));
        } else {
          image_path = image;
        }
      }
      const addReviewEndpoint = isUpdate
        ? `${API_URL}${DESTINATIONS_URL}${destination_id}/update-review`
        : `${API_URL}${DESTINATIONS_URL}${destination_id}/user-review`;

      const requestOptionsUser = {
        method: isUpdate ? "PATCH" : "POST",
        // headers: { "Content-Type": "application/json" },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + storedCredentials,
        },
        body: JSON.stringify({
          id: 1,
          title: title,
          text: text,
          calification: calification,
          date: "2020-12-12 12:12:00",
          image_path: image_path,
          user_id: 1,
          tourist_destination_id: destination_id,
        }),
      };
      fetch(addReviewEndpoint, requestOptionsUser)
        .then((response) => response.json())
        .then((data) => {
          // alert()
          navigation.pop();
        });
    }
  };

  const pickImageProfile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      let localUri = result.uri;
      let filename = localUri.split("/").pop();

      let match = /.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      setImage({ uri: localUri, name: filename, type });
    }
  };

  if (loading) return null;

  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      style={[
        styles.safeContainer,
        appStyles.default.appBackgroundColor,
        { flex: 0.85 },
      ]}
    >
      <Pressable
        onPress={() => navigation.pop()}
        style={[appStyles.default.exitView, { elevation: 31 }]}
      >
        <Image style={appStyles.default.exitImage} source={Exit} />
      </Pressable>
      <View style={styles.horizontalContainer}>
        <View style={styles.profileView}>
          <Image
            style={styles.profileImage}
            source={
              profile.profile_photo_path !== "/"
                ? {
                    width: PROFILE_PHOTO_IMAGE_WIDTH,
                    height: PROFILE_PHOTO_IMAGE_HEIGHT,
                    uri: `${IMAGE_BASE_URL}${profile.profile_photo_path}`,
                  }
                : NoProfile
            }
          />
        </View>
        <View>
          <Text style={[styles.usernameText, appStyles.default.defaultFont]}>
            {profile.name}
          </Text>
          <Text>
            Las opiniones son públicas y contienen información de tu cuenta.
          </Text>
        </View>
      </View>
      <View style={styles.starsContainer}>
        <Pressable onPress={(event) => setCalification(1)}>
          <Image
            style={styles.starImage}
            source={calification >= 1 ? Filled_star : Star}
          />
        </Pressable>
        <Pressable onPress={(event) => setCalification(2)}>
          <Image
            style={styles.starImage}
            source={calification >= 2 ? Filled_star : Star}
          />
        </Pressable>
        <Pressable onPress={(event) => setCalification(3)}>
          <Image
            style={styles.starImage}
            source={calification >= 3 ? Filled_star : Star}
          />
        </Pressable>
        <Pressable onPress={(event) => setCalification(4)}>
          <Image
            style={styles.starImage}
            source={calification >= 4 ? Filled_star : Star}
          />
        </Pressable>
        <Pressable onPress={(event) => setCalification(5)}>
          <Image
            style={styles.starImage}
            source={calification >= 5 ? Filled_star : Star}
          />
        </Pressable>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Título para tu comentario"
          style={[styles.inputText, { width: "90%" }]}
          secureTextEntry={false}
          onChangeText={(event) => setTitle(event)}
          value={title}
          maxLength={35}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Describe tu experiencia"
          style={[
            styles.inputText,
            { maxWidth: "93%", maxHeight: 200, width: "90%" },
          ]}
          secureTextEntry={false}
          onChangeText={(event) => setText(event)}
          value={text}
          multiline={true}
          maxLength={500}
        />
      </View>
      {image !== null && image !== "" ? (
        <View
          style={{
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            height: image_height,
            width: "100%",
            marginTop: 10,
          }}
        >
          <Image
            style={{
              resizeMode: "contain",
              height: "100%",
              width: "100%",
            }}
            source={
              image.uri !== undefined
                ? { uri: image.uri }
                : {
                    width: REVIEW_IMAGE_WIDTH,
                    height: REVIEW_IMAGE_HEIGHT,
                    uri: `${IMAGE_BASE_URL}${image}`,
                  }
            }
          />
        </View>
      ) : null}
      <View style={[{ display: "flex", flexDirection: "row", columnGap: 20 }]}>
        <Pressable
          style={[styles.containerS, { backgroundColor: "#769E5F" }]}
          onPress={pickImageProfile}
        >
          <Text style={styles.submitText}>Agregar Imagen</Text>
        </Pressable>
        {image !== null ? (
          <Pressable
            style={[
              styles.containerS,
              {
                backgroundColor: "#FB2901",
                width: "auto",
                marginHorizontal: 10,
                paddingHorizontal: 10,
              },
            ]}
            onPress={() => setImage(null)}
          >
            <Text style={styles.submitText}>Eliminar</Text>
          </Pressable>
        ) : null}
      </View>
      <Pressable
        style={[styles.containerS, { backgroundColor: "#769E5F" }]}
        onPress={addReview}
      >
        <Text style={styles.submitText}>Publicar</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    alignItems: "center",
  },
  horizontalContainer: {
    marginTop: 60,
    flexDirection: "row",
    width: "80%",
    justifyContent: "center",
    left: 10,
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  containerS: {
    width: "50%",
    borderRadius: 10,
    marginTop: 15,
  },
  starsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  inputContainer: {
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.2)",
    paddingRight: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  usernameText: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 10,
    lineHeight: 13,

    color: "#676767",
  },
  inputText: {
    fontSize: 20,
    color: "black",
    marginLeft: 15,
  },
  submitText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "black",
    alignSelf: "center",
    marginVertical: 5,
  },
  profileView: {
    width: 31,
    height: 31,
    borderRadius: 60,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 31,
    height: 31,
    resizeMode: "contain",
  },
  starImage: {
    width: 28.33,
    height: 25.33,

    marginHorizontal: 5,
  },
});

export default ReviewForm;
