import React, { useState, useEffect, useContext } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  View,
} from "react-native";

// Componentes
import HomeSearchBar from "../components/HomeSearchBar";
import HomeButton from "../components/HomeButton";
import OpenURLButton from "../components/OpenURLButton";

// Autenticación
import { CredentialsContext } from "../CredentialsContext";
import { API_URL, DESTINATIONS_URL, SECRET } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const appStyles = require("../appStyle");

/***
 * Pantalla del Menú Principa de la Aplicación.
 * @param navigation Pila para el manejo de Ventanas
 * @returns {JSX.Element}
 */
const Home = ({ navigation }) => {
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  const endpoint = API_URL + DESTINATIONS_URL;

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch(endpoint)
      .then((response) => response.json())
      .then((json) => {
        if (isMounted) setDestinations(json);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        isMounted = false;
        setLoading(false);
      });
  }, []);

  const searchItems = (text) => {
    const newData = destinations.filter((item) => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setSearchResult(newData);
  };

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResult([]);
    } else {
      searchItems(searchTerm);
    }
  }, [searchTerm]);

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  const ClearLogin = () => {
    AsyncStorage.removeItem(SECRET)
      .then(() => {
        setStoredCredentials("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <KeyboardAvoidingView
      behavior={"height"}
      style={[styles.container, appStyles.default.appBackgroundColor]}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : -100}
    >
      <Image
        style={styles.logo}
        source={require("../../assets/menu-icon.png")}
      />
      <View>
        <HomeSearchBar setSearchTerm={setSearchTerm} />
        {searchTerm !== "" ? (
          <View
            style={{
              flex: 1,
              flexGrow: 1,

              borderRadius: 7,
              paddingVertical: 5,
              paddingHorizontal: 15,
              margin: 10,
              width: "90%",
              // height: "100%",
              alignSelf: "center",
              justifyContent: "center",
              position: "absolute",
              backgroundColor: "#FFF",
              borderColor: "rgba(0, 0, 0, 0.5)",
              borderWidth: 2,
              zIndex: 10,
              top: 90,
              maxHeight: "70%",
            }}
          >
            <FlatList
              data={searchResult}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    navigation.push("Destination", { destination: item });
                  }}
                >
                  <Text style={{ padding: 10 }}>{item.name} </Text>
                </Pressable>
              )}
              keyExtractor={(item) => item.name}
              ItemSeparatorComponent={renderSeparator}
              ListEmptyComponent={() => (
                <Text
                  style={[
                    { padding: 10, color: "#7B7B7B" },
                    appStyles.default.defaultFont,
                  ]}
                >
                  Ningún nombre de destino coincide
                </Text>
              )}
            />
          </View>
        ) : null}
      </View>
      <HomeButton
        title="Destinos de Costa Rica"
        to="InformationSection"
        navigation={navigation}
        opacity={searchTerm !== "" ? 0.3 : 1}
      />
      <OpenURLButton
        url={"https://serviciosenlinea.sinac.go.cr/"}
        text="Compra y Reserva"
        opacity={searchTerm !== "" ? 0.3 : 1}
      >
        Open Supported URL
      </OpenURLButton>
      <HomeButton
        title="Mi Perfil"
        to={storedCredentials ? "MyProfile" : "Login"}
        navigation={navigation}
        opacity={searchTerm !== "" ? 0.3 : 1}
      />
      <Pressable
        opacity={searchTerm !== "" ? 0.3 : 1}
        style={styles.aboutButton}
        onPress={() => {
          navigation.navigate("About");
        }}
        opacity={searchTerm !== "" ? 0.3 : 1}
      >
        <Text style={styles.aboutText}>Conózcanos</Text>
      </Pressable>
      {storedCredentials ? (
        <Pressable
          style={[styles.aboutButton, { bottom: 30 }]}
          onPress={() => {
            ClearLogin();
          }}
          opacity={searchTerm !== "" ? 0.3 : 1}
        >
          <Text style={styles.aboutText}>Salir de la sesión</Text>
        </Pressable>
      ) : null}
    </KeyboardAvoidingView>
  );
};

/***
 * Estilos utilizados en el componente de Home.
 * @type {{container: {alignItems: string, flex: number, justifyContent: string}, logo: {backgroundColor: string, width: number, marginBottom: number, resizeMode: string, height: number}, aboutButton: {borderBottomColor: string, paddingVertical: number, backgroundColor: string, borderRadius: number, paddingHorizontal: number, shadowOpacity: number, shadowColor: string, marginTop: number}, aboutText: {color: string, textAlign: string, letterSpacing: number, fontSize: number, lineHeight: number, fontStyle: string, fontWeight: string}}}
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 70,
    width: 120,
    resizeMode: "stretch",
    backgroundColor: "transparent",
    marginBottom: 36,
  },
  aboutText: {
    fontStyle: "normal",
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "rgba(0, 0, 0, 0.6)",
  },
  aboutButton: {
    backgroundColor: "#E1EAD9",
    marginTop: 53,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOpacity: 3,
    borderRadius: 20,
    borderBottomColor: "#000",
    paddingVertical: 6,
    paddingHorizontal: 60,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4.65,

    elevation: 5,
  },
});
export default Home;
