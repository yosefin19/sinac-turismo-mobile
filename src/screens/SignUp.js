import React, { useState } from "react";
import { Pressable, Image, StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { API_URL } from "../config";
const appStyles = require("../appStyle");
const SignUp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const Agregar = () => {
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

        // Agregar perfil
        const requestOptionsProfile = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: 0,
            name: name,
            phone: phone,
            user_id: id_user,
            profile_photo_path: "/",
            cover_photo_path: "/",
          }),
        };
        fetch(`${API_URL}add-profile`, requestOptionsProfile)
          .then((response) => response.json())
          .then((data) => {
           
            const requestOptionsGallery = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: 0,
                profile_id: id_user,
                photos_path: "/",
              }),
            };
            fetch(`${API_URL}add-gallery`, requestOptionsGallery)
            .then((response) => response.json())

          });
      })
      .catch((error) => console.log(error));

    navigation.navigate("Login");
  };
  return (
    <ScrollView>
            
     <View style={styles.container}>
     <Image style={styles.logo} source={require('../../assets/menu-icon.png')}/>
      
      <Text style={styles.textTitle}>Crear una cuenta</Text>

      <View style={styles.containerForm}>
          <Icon style={{marginLeft: 8, marginRight:8}} name="user" size={22} color={"grey"} />
        <TextInput
          placeholder="Nombre"
          inputStyle={[styles.inputText, appStyles.default.defaultFont]}
           secureTextEntry={false}
          onChangeText={(event) => setName(event)}
          value={name}
        />
      </View>

      <View style={styles.containerForm}>
        <Icon style={{marginLeft: 8, marginRight:8}} name="envelope" size={22} color={"grey"} />
        <TextInput
          placeholder="Correo electronico"
          inputStyle={[styles.inputText, appStyles.default.defaultFont]}
          secureTextEntry={false}
          onChangeText={(event) => setEmail(event)}
          value={email}
        />
      </View>

      <View style={styles.containerForm}>
         <Icon style={{marginLeft: 8, marginRight:8}} name="phone" size={22} color={"grey"} />
        <TextInput
          placeholder="Numero telefonico"
          inputStyle={[styles.inputText, appStyles.default.defaultFont]}
          secureTextEntry={false}
          onChangeText={(event) => setPhone(event)}
          value={phone}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.containerForm}><Icon style={{marginLeft: 8, marginRight:8}}  name="lock" size={22} color={"grey"} />
        <TextInput
          placeholder="Contraseña"
          inputStyle={[styles.inputText, appStyles.default.defaultFont]}
          secureTextEntry={true}
          onChangeText={(event) => setPassword(event)}
          value={password}
        />
      </View>

      <Pressable
        style={styles.containerS}  onPress={Agregar}
      >
         <Text style={[styles.submitText,appStyles.default.defaultFont]}>Actualizar</Text>
    </Pressable>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerV: {
    marginTop: 100,
    width: "90%",
    height: 50,
    marginVertical: 10,
    flexDirection: "row",
  },
  logo: {
    height: 70,
    width: 120,
    resizeMode: "stretch",
    backgroundColor: "transparent",
    marginTop: "20%",
    marginBottom: '15%',
},
  containerS: {
    borderRadius: 4,
    backgroundColor: "rgba(118, 159, 94, 0.6)",
    width: "30%",
    height: 50,
    alignItems: 'center',
    justifyContent: "center",
    marginTop: "5%",
  },
  submitText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "grey",
    alignSelf: "center",
    marginVertical: 5,
  },
  containerForm: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: "80%",
    height: 50,
    borderWidth: 0.7,
    borderColor: "#C4C4C4",
    borderRadius: 7,
    marginTop: "5%",
    },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    width: "80%",
    marginTop:50,
    fontSize: 18,
  },
  inputText: {
    color: "#9999",
    marginLeft: 5,
  },
});
export default SignUp;
