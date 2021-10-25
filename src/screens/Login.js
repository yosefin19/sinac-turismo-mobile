import React from "react";
import { useState, useContext } from "react";
import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { API_URL, SECRET } from "../config";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Autenticación
import { CredentialsContext } from "../CredentialsContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const persistLogin = (credentials, message, status) => {
    AsyncStorage.setItem(SECRET, JSON.stringify(credentials))
      .then(() => {
        setStoredCredentials(credentials);
        console.log("storedCredentials", storedCredentials);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Login = () => {
    //Ingresar usuario
    const requestOptionsUser = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    fetch(`${API_URL}login`, requestOptionsUser)
      .then((response) => response.json())
      .then((data) => {
        console.log("response", data);

        const { token } = data;

        if (token === null) {
          persistLogin(token, "FAILURE", 500);
          // ERROR?
        } else {
          persistLogin(token, "SUCCESS", 200);
          // HOME?
        }
      });
  };
  const SignUp = () => {
    navigation.navigate(to, route);
  };
  return (
    <View style={styles.container}>
      <View style={[styles.containerV, { borderColor: "#eeee" }]}>
        <Icon name="envelope" size={22} color={"grey"} />
        <TextInput
          placeholder="Correo electronico"
          style={styles.inputText}
          secureTextEntry={false}
          onChangeText={(event) => setEmail(event)}
          value={email}
        />
      </View>

      <View style={[styles.containerV, { borderColor: "#eeee" }]}>
        <Icon name="lock" size={22} color={"grey"} />
        <TextInput
          placeholder="Contraseña"
          style={styles.inputText}
          secureTextEntry={true}
          onChangeText={(event) => setPassword(event)}
          value={password}
        />
      </View>

      <Pressable
        style={[styles.containerS, { backgroundColor: "#769E5F" }]}
        onPress={Login}
      >
        <Text style={styles.submitText}>Ingresar</Text>
      </Pressable>

      <View style={styles.container}>
        <Text>No tiene una cuenta?</Text>
      </View>
      <Pressable
        style={[styles.containerS, { backgroundColor: "#769E5F" }]}
        onPress={SignUp}
      >
        <Text style={styles.submitText}>Registrar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  containerV: {
    flexDirection: "row",
    width: "90%",
    height: 50,
    borderRadius: 100,
    marginVertical: 10,
    borderWidth: 3.5,
  },
  container: {
    marginTop: "50%",
    alignItems: "center",
  },
  containerS: {
    width: "35%",
    borderRadius: 15,
    marginVertical: 20,
  },
  textTitle: {
    fontSize: 20,
    marginVertical: 5,
  },
  inputText: {
    fontSize: 20,
    color: "black",
    marginLeft: 15,
  },
  submitText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "grey",
    alignSelf: "center",
    marginVertical: 5,
  },
});
export default Login;
