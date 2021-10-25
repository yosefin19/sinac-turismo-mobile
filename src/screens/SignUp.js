import React, { useState, useContext } from "react";
import { Component } from "react";
import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { API_URL, SECRET } from "../config";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Autenticación
import { CredentialsContext } from "../CredentialsContext";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const Agregar = () => {
    console.log("email", email);
    console.log("password", password);

    if (name === "" || email === "" || phone === "" || password === "") {
      return;
    }

    const requestOptionsUser = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: 0,
        email: email,
        password: password,
        admin: false,
      }),
    };

    fetch(`${API_URL}add-user`, requestOptionsUser)
      .then((response) => response.json())
      .then((data) => {
        let id_user = data.id;
        console.log("id:", id_user);
        console.log("response adduser", data);

        // if (status !== "SUCCESS") {
        //   // ERROR?
        // } else {
        //   // HOME?
        // }
        // Agregar perfil
        const requestOptionsProfile = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: 0,
            email: email,
            name: name,
            phone: phone,
            user_id: id_user,
            profile_photo_path: "/",
            cover_photo_path: "/",
          }),
        };
        console.log("requestaddprofile", requestOptionsProfile);
        fetch(`${API_URL}add-profile`, requestOptionsProfile)
          .then((response) => response.json())
          .then((data) => {
            console.log("response addprofile", data);
          });
      })
      .catch((error) => console.log(error));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Crear una cuenta</Text>

      <View style={[styles.containerV, { borderColor: "#eeee" }]}>
        <Icon name="user" size={22} color={"grey"} />
        <TextInput
          placeholder="Nombre"
          style={styles.inputText}
          secureTextEntry={false}
          onChangeText={(event) => setName(event)}
          value={name}
        />
      </View>

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
        <Icon name="phone" size={22} color={"grey"} />
        <TextInput
          placeholder="Numero telefonico"
          style={styles.inputText}
          secureTextEntry={false}
          onChangeText={(event) => setPhone(event)}
          value={phone}
          keyboardType="numeric"
        />
      </View>

      <View style={[styles.containerV, { borderColor: "#eeee" }]}>
        <Icon name="lock" size={22} color={"grey"} />
        <TextInput
          placeholder="Contraseña"
          inputStyle={styles.inputText}
          secureTextEntry={true}
          onChangeText={(event) => setPassword(event)}
          value={password}
        />
      </View>

      <Pressable
        style={[styles.containerS, { backgroundColor: "#769E5F" }]}
        onPress={Agregar}
      >
        <Text style={styles.submitText}>Registrar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  containerV: {
    width: "90%",
    height: 50,
    borderRadius: 100,
    marginVertical: 10,
    borderWidth: 3.5,
    flexDirection: "row",
  },
  containerS: {
    width: "35%",
    borderRadius: 15,
    marginVertical: 20,
  },
  submitText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "grey",
    alignSelf: "center",
    marginVertical: 5,
  },
  container: {
    marginTop: 200,
    alignItems: "center",
  },

  textTitle: {
    fontSize: 20,
    marginVertical: 5,
  },
  inputText: {
    color: "#9999",
    marginLeft: 5,
  },
});
export default SignUp;
