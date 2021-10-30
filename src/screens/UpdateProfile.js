import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, ScrollView, TextInput, Pressable, Platform, Dimensions } from "react-native";
import IconA from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from 'expo-image-picker';
import { CredentialsContext } from "../CredentialsContext";


let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;
const appStyles = require("../appStyle");

import Exit from "../images/exit.png";
import { API_URL, IMAGE_BASE_URL } from "../config";

const UpdateProfile = ({route, navigation}) => {
  
    const { profile } = route.params;
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const [name, setName] = useState("");
    const [emailUser, setEmailUser] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    //Solicitud de permisos para acceder a la galeria
    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Debe asignar permisos si desea agregar fotos de su galeria');
          }
        }
      })();
    }, []);
  
    //Funcion que permite seleccionar una foto y posteriormente actualizar
    //la foto de perfil del perfil de usuario con la seleccionada
    const pickImageProfile = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
       mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
  
    if (!result.cancelled) {
      const endpoint = API_URL + `profiles/photo/profile`;

      let localUri = result.uri;        
      let filename = localUri.split('/').pop();
      let match = /.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      let formData = new FormData();
      formData.append('image', { uri: localUri, name: filename, type });
  
      const requestOptions = {
        method: 'POST',
        body:formData,
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + storedCredentials ,
          },
      };
      
      fetch(endpoint, requestOptions)
      .then(response => response.json())
      .catch((error) => console.error(error)); 
     }
    };

    //Funcion que permite seleccionar una foto y posteriormente actualizar
    //la foto de portada del perfil de usuario con la seleccionada
    const pickImageCover = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
       mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
  
    if (!result.cancelled) {
      const endpoint = API_URL + `profiles/photo/cover`;

      let localUri = result.uri;        
      let filename = localUri.split('/').pop();
      let match = /.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      let formData = new FormData();
      formData.append('image', { uri: localUri, name: filename, type });
  
      const requestOptions = {
        method: 'POST',
        body:formData,
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + storedCredentials ,
          },
      };
      fetch(endpoint, requestOptions)
      .then(response => response.json())
     }
    }
    


    useEffect(() => {
      const endpoint = API_URL+ 'user' ;
      const requestOptions = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + storedCredentials ,
          },
      };
      fetch(endpoint, requestOptions)
      .then((response) => response.json())
      .then((data) => {
            setEmailUser(data.email);
        })
        .catch((error) => console.error(error));
    }, []);

    const ActualizarProfile =()=> {

      const endpointProfile =  `${API_URL}update-profile`;
      const requestOptionsProfile = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + storedCredentials ,
        },
          body: JSON.stringify({  
            id:0,
            user_id: 0,
            name: name,
            phone: phone,
            profile_photo_path: "",
            cover_photo_path: ""
          })
        };
          fetch(endpointProfile, requestOptionsProfile)
          .then(response => response.json()) 
          .catch((error) => console.error(error)); 

        
    }

    const ActualizarUser = () => {

        const endpointUser =  `${API_URL}update-user`;
        const requestOptionsUser = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + storedCredentials ,
        },
         body: JSON.stringify({ 
           id: 0, email: email, password:password, admin:false})
       };
         fetch(endpointUser, requestOptionsUser)
         .then(response => response.json())
         .catch((error) => console.error(error));
        
     }

     const update = () => {
       ActualizarProfile();
       ActualizarUser();
       navigation.navigate("MyProfile");
     }
    return (

          <ScrollView>
            <View>
            <Image source={{uri: `${IMAGE_BASE_URL}${profile.cover_photo_path}`}} style={styles.cover}/>
              <Pressable style={styles.updatecover} onPress={pickImageCover}>
                      <IconA name="photo-camera" size={21} color={"grey"} />
              </Pressable>
              
          </View> 
                   <View style={[appStyles.default.exitView, { elevation: 31 }]}>
                  <Image style={appStyles.default.exitImage} source={Exit} />
              </View>

               <View style={{alignItems:'center'}}>
                   <Image source={{uri: `${IMAGE_BASE_URL}${profile.profile_photo_path}` }} style={styles.profileImage}/>
                   
                   <Pressable style={styles.updateprofile} onPress={pickImageProfile}>
                      <IconA name="photo-camera" size={21} color={"grey"} />
                   </Pressable>
                   <Text>{profile.name}</Text>
                </View>


      <View style={[styles.containerV, { borderColor: "#eeee" }]}>
        <Icon name="user" size={22} color={"grey"} />
        <TextInput
          placeholder = {profile.name}
          style={styles.inputText}
          secureTextEntry={false}
          onChangeText={(event) => setName(event)}
          value={name}
        />
      </View>

      <View style={[styles.containerV, { borderColor: "#eeee" }]}>
        <Icon name="envelope" size={22} color={"grey"} />
        <TextInput
          placeholder={emailUser}
          style={styles.inputText}
          secureTextEntry={false}
          onChangeText={(event) => setEmail(event)}
          value={email}
        />
      </View>

      <View style={[styles.containerV, { borderColor: "#eeee" }]}>
        <Icon name="phone" size={22} color={"grey"} />
        <TextInput
          placeholder={profile.phone}
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
         onPress={update}
      >
        <Text style={styles.submitText}>Actualizar</Text>
      </Pressable>
   


            </ScrollView>
        )
};

const styles = StyleSheet.create({
    text: {
        color: "#52575D"
    },
    profileImage: {
        width: 140,
        height: 140,
        borderRadius: 100,
        marginTop: -70,
    },   
    cover:{
      flex: 1,
      width: deviceWidth,
      height:deviceHeight*0.25,
  },
    containerV: {
        width: "90%",
        height: 50,
        borderRadius: 100,
        marginVertical: 10,
        borderWidth: 3.5,
        flexDirection: "row",
        display: 'flex',
        flexWrap:'wrap'
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
      updatecover:{ 
        left: deviceWidth - deviceWidth*0.05,
        width: 31,
        height: 31,
        bottom: 25,
        backgroundColor: "#F0F0F0",
        borderRadius: 60,
        alignItems: "center",
        justifyContent: "center"
    },
    updateprofile:{ 
      left: 15,
      width: 31,
      height: 31,
      backgroundColor: "#F0F0F0",
      borderRadius: 60,
      bottom: 10,
      alignItems: "center",
      justifyContent: "center"
  },

});
export default UpdateProfile;





