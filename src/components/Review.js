import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";

// Componentes
import Stars from "./Stars";

// Imagenes
import NoImage from "../images/no_image.png";
import NoProfile from "../images/no_profile.png";

// Configuración
import {
  API_URL,
  IMAGE_BASE_URL,
  USERS_URL,
  PROFILES_URL,
  PROFILE_PHOTO_IMAGE_WIDTH,
  PROFILE_PHOTO_IMAGE_HEIGHT,
  REVIEW_IMAGE_WIDTH,
  REVIEW_IMAGE_HEIGHT,
  IMAGE_IN_REVIEW_PERCENTAGE,
} from "../config";

// Estilos globales
const appStyles = require("../appStyle");

// Dimensiones de la imagen
const image_height =
  Dimensions.get("window").height * IMAGE_IN_REVIEW_PERCENTAGE;

/***
 * Componente que contiene la información de la opinión de un usuario.
 * @param review Objeto con la información de una opinión.
 * @returns {JSX.Element}
 */
const Review = ({ review }) => {
  const id = review.id;
  const title = review.title;
  const date = review.date;
  const text = review.text;
  const calification = review.calification;
  const image_path = review.image_path;
  const user_id = review.user_id;
  const tourist_destination_id = review.tourist_destination_id;

  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const profilesEndpoint = `${API_URL}${USERS_URL}${review.user_id}/${PROFILES_URL}`;

  useEffect(() => {
    let isMounted = true;

    fetch(profilesEndpoint)
      .then((response) => response.json())
      .then((json) => {
        if (isMounted) setProfile(json);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        isMounted = false;
        setLoading(false);
      });
  }, []);

  return (
    <View>
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
          <Stars review={calification} />
        </View>
      </View>
      {title ? (
        <Text style={[styles.titleText, appStyles.default.defaultFont]}>
          {title}
        </Text>
      ) : null}
      {date ? (
        <Text style={[styles.dateText, appStyles.default.defaultFont]}>
          {date}
        </Text>
      ) : null}
      {text ? (
        <Text style={[styles.reviewText, appStyles.default.defaultFont]}>
          {text}
        </Text>
      ) : null}
      {image_path ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            style={styles.reviewImage}
            source={{
              width: REVIEW_IMAGE_WIDTH,
              height: REVIEW_IMAGE_HEIGHT,
              uri: `${IMAGE_BASE_URL}${image_path}`,
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#000",
  },
  horizontalContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  scrollableContainer: {
    height: "100%",
    paddingHorizontal: 33,
    marginTop: 19,
    marginBottom: 5,
  },
  profileView: {
    width: 31,
    height: 31,
    borderRadius: 60,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  profileImage: {
    width: 31,
    height: 31,
  },
  reviewImage: {
    height: image_height,
    resizeMode: "contain",
  },
  usernameText: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 10,
    lineHeight: 13,

    color: "#676767",
  },
  titleText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 10,
    lineHeight: 13,

    color: "#676767",
  },
  dateText: {
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 8,
    lineHeight: 11,

    color: "#676767",
  },
  reviewText: {
    marginVertical: 1,

    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 10,
    lineHeight: 13,

    color: "#676767",
  },
  writeOpinionText: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 16,

    textAlign: "justify",
    textDecorationLine: "underline",

    marginHorizontal: 33,
    marginTop: 8,

    color: "#769F5E",
  },
  starImage: {
    width: 28.33,
    height: 25.33,

    marginHorizontal: 5,
  },
  horizontalLine: {
    width: "150%",
    borderWidth: 0.18,
    borderColor: "#000",

    marginTop: 3.5,
    marginHorizontal: -100,
  },
});

export default Review;
