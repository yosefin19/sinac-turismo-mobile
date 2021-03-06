import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import ConstantMenu from "../components/ConstantMenu";
import { ActivityIndicator } from "react-native-paper";
import Icon from "react-native-vector-icons/Fontisto";
import GalleryList from "../components/GalleryList";
import InformationList from "../components/InformationList";
import { CredentialsContext } from "../CredentialsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  API_URL,
  DESTINATIONS_URL,
  ALL_URL,
  VISITED_URL,
  IMAGE_BASE_URL,
  SECRET,
} from "../config";
let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;
// Imagenes
import Exit from "../images/exit.png";

// Estilos globales
const appStyles = require("../appStyle");

const lists_height = Dimensions.get("window").height * 0.2;

const MyProfile = ({ navigation }) => {
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const [name, setName] = useState("");
  //fotos de la galeria
  const [profile_photo, setProfile] = useState("");
  const [cover_photo, setCover] = useState("");
  //Todos los datos del perfil
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  const [recommendation, setRecom] = useState([]);
  const [loadingDestinations, setLoadingDestinations] = useState(true);
  const [visited, setVisited] = useState([]);
  const [state, setState] = useState(0);

  const isFocused = useIsFocused();

  const changeToDestination = () => {
    if (state !== 0) {
      setState(0);
      recommendationLo();
    }
  };
  const changeToGallery = () => {
    if (state !== 1) {
      setState(1);
      setLoadingDestinations(true);
    }
  };
  const ClearLogin = () => {
    AsyncStorage.removeItem(SECRET)
      .then(() => {
        setStoredCredentials("");
        navigation.goBack();
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const endpoint = API_URL + "profile";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + storedCredentials,
      },
    };

    fetch(endpoint, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setName(data.name);
        setProfile(data.profile_photo_path);
        setCover(data.cover_photo_path);
        if (data.cover_photo_path == "/") {
          setCover(require("../images/defaultCover.jpg"));
        } else {
          setCover({ uri: `${IMAGE_BASE_URL}${data.cover_photo_path}` });
        }
        if (data.profile_photo_path == "/") {
          setProfile(require("../images/defaultProfile.png"));
        } else {
          setProfile({ uri: `${IMAGE_BASE_URL}${data.profile_photo_path}` });
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    recommendationLo();
  }, []);

  const recommendationLo = () => {
    const endpointR = API_URL + "profile/recommendation/";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + storedCredentials,
      },
    };
    fetch(endpointR, requestOptions)
      .then((response) => response.json())
      .then((datos) => {
        setRecom(datos);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingDestinations(false));
  };

  const visitedEndpoint = `${API_URL}${DESTINATIONS_URL}${ALL_URL}${VISITED_URL}`;
  useEffect(() => {
    let isMounted = true;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + storedCredentials,
      },
    };
    fetch(visitedEndpoint, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        if (isMounted) setVisited(json);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        isMounted = false;
        setLoading(false);
      });
  }, [isFocused]);

  return loading ? (
    <View style={{ height: "100%", justifyContent: "center" }}></View>
  ) : (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.profile}>
        <Image source={cover_photo} style={styles.cover} />

        <View style={{ alignItems: "center" }}>
          <Image source={profile_photo} style={styles.profileImage} />
          <Text>{name}</Text>
        </View>
        <Pressable
          onPress={() => navigation.goBack()}
          style={[appStyles.default.exitView, { elevation: 31 }]}
        >
          <Image style={appStyles.default.exitImage} source={Exit} />
        </Pressable>

        <Pressable
          style={styles.update}
          onPress={() => {
            navigation.navigate("Update", { profile: user });
          }}
        >
          <Icon name="player-settings" size={21} color={"grey"} />
        </Pressable>
        <Pressable
          style={styles.logout}
          onPress={() => {
            ClearLogin();
          }}
        >
          <Icon name="close-a" size={21} color={"grey"} />
        </Pressable>
      </View>

      <View style={styles.optionsContainer}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={[styles.optionsText, appStyles.default.defaultFont]}
            onPress={changeToDestination}
          >
            Destinos
          </Text>
          {state === 0 && (
            <View
              style={[
                styles.selectedLine,
                Platform.OS === "android"
                  ? appStyles.default.androidShadowBox
                  : appStyles.default.iosShadowBox,
              ]}
            />
          )}
        </View>
        <View style={{ alignItems: "center" }}>
          <Text
            style={[styles.optionsText, appStyles.default.defaultFont]}
            onPress={changeToGallery}
          >
            Galeria
          </Text>
          {state === 1 && (
            <View
              style={[
                styles.selectedLine,
                Platform.OS === "android"
                  ? appStyles.default.androidShadowBox
                  : appStyles.default.iosShadowBox,
              ]}
            />
          )}
        </View>
      </View>

      {state === 0 && (
        <View style={styles.recommendationContainer}>
          <View>
            <Text style={styles.text}>Visitados</Text>
            {loadingDestinations ? (
              <ActivityIndicator
                animating={true}
                size={"large"}
                color={"rgba(118, 159, 94, 0.6)"}
              />
            ) : (
              <View style={styles.reco}>
                <InformationList
                  destinations={visited}
                  navigation={navigation}
                  isArea={false}
                />
              </View>
            )}
          </View>
          <View>
            <Text style={styles.text}>Recomendados para ti</Text>
            {loadingDestinations ? (
              <ActivityIndicator
                animating={true}
                size={"large"}
                color={"rgba(118, 159, 94, 0.6)"}
              />
            ) : (
              <View style={styles.reco}>
                <InformationList
                  destinations={recommendation}
                  navigation={navigation}
                  isArea={false}
                />
              </View>
            )}
          </View>
        </View>
      )}

      {state === 1 && (
        <ScrollView style={[styles.scrollView, { width: "100%" }]}>
          <GalleryList navigation={navigation} />
        </ScrollView>
      )}
      <View
        style={{
          top: -5,
          alignItems: "center",
          justifyContent: "center",
          flex: 0,
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
    alignItems: "center",
  },
  text: {
    color: "#52575D",
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 100,
    marginTop: -70,
  },
  logout: {
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
  update: {
    position: "absolute",
    right: 59,
    width: 31,
    height: 31,
    backgroundColor: "#F0F0F0",
    borderRadius: 60,
    top: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  cover: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight * 0.25,
  },
  profile: {
    width: deviceWidth,
    height: deviceHeight * 0.35,
  },
  scrollView: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  optionsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",

    marginHorizontal: 10,
    paddingBottom: 20,
    paddingHorizontal: 23,
  },
  selectedLine: {
    borderWidth: 1,
    borderColor: "#DD9B5E",
    width: "100%",
    position: "absolute",
    marginTop: 12,
    top: 14,
  },
  optionsText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 13,
    margin: 8,
    lineHeight: 17,
    color: "#7f7f7f",
  },
  horizontalLine: {
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.2)",
    marginTop: 3.5,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    color: "#383837",
    marginBottom: "3%",
  },
  recommendationContainer: {
    width: "95%",
    flex: 1,
  },
  reco: {
    height: lists_height,
  },
});
export default MyProfile;
