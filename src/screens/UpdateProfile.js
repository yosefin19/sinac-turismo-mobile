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
        //fotos de la galeria
    const [profile_photo, setProfile] = useState("");
    const [cover_photo, setCover] = useState("");
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const [name, setName] = useState("");
    const [emailUser, setEmailUser] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [resultProfile, setResProfile] = useState();
    const [resultCover, setResCover] = useState();
    const [profilePhoto, setBoolProfile] = useState(false);
    const [coverPhoto, setBoolCover] = useState(false);


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
      setBoolProfile(true)
      setResProfile(result);
     }
    };

    //Funcion que permite seleccionar una foto y posteriormente actualizar
    //la foto de portada del perfil de usuario con la seleccionada
    const pickImageCover = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
       mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
  
    if (!result.cancelled) {
      setBoolCover(true)
      setResCover(result);
    }
  }
  const addPhotos = () => {
    if(coverPhoto){
      const endpoint = API_URL + `profiles/photo/cover`;

      let localUri = resultCover.uri;        
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

    if(profilePhoto){
      
      const endpoint = API_URL + `profiles/photo/profile`;

      let localUri = resultProfile.uri;        
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
  };
    
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
      if(profile.cover_photo_path == "/"){
          setCover(require("../images/defaultCover.jpg"));}
      else {
          setCover({uri:`${IMAGE_BASE_URL}${profile.cover_photo_path}`});
      }
      if(profile.profile_photo_path == "/"){
        setProfile(require("../images/defaultProfile.png"));}
      else {
      setProfile({uri:`${IMAGE_BASE_URL}${profile.profile_photo_path}`});
      } 
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
       addPhotos();
       ActualizarProfile();
       ActualizarUser();
       navigation.navigate("MyProfile");
     }
    return (

          <ScrollView>
            <View>
            <Image source={cover_photo} style={styles.cover}/>
              <Pressable style={styles.updatecover} onPress={pickImageCover}>
                      <IconA name="photo-camera" size={21} color={"grey"} />
              </Pressable>
              
          </View> 
                   <View style={[appStyles.default.exitView, { elevation: 31 }]}>
                  <Image style={appStyles.default.exitImage} source={Exit} />
              </View>

               <View style={{alignItems:'center'}}>
                   <Image source={profile_photo} style={styles.profileImage}/>
                   
                   <Pressable style={styles.updateprofile} onPress={pickImageProfile}>
                      <IconA name="photo-camera" size={21} color={"grey"} />
                   </Pressable>
                   <Text  style= {appStyles.default.defaultFont}>{profile.name}</Text>
                </View>


      <View style={styles.containerForm}>
        <Icon style={{marginLeft: 8}} name="user" size={22} color={"grey"} />
        <TextInput
          placeholder = {profile.name}
          style={[styles.inputText,  appStyles.default.defaultFont]}
          secureTextEntry={false}
          onChangeText={(event) => setName(event)}
          value={name}
        />
      </View>

      <View style={styles.containerForm}>
        <Icon style={{marginLeft: 8}} name="envelope" size={22} color={"grey"} />
        <TextInput
          placeholder={emailUser}
          style={[styles.inputText,  appStyles.default.defaultFont]}
          secureTextEntry={false}
          onChangeText={(event) => setEmail(event)}
          value={email}
        />
      </View>

      <View style={styles.containerForm}>
        <Icon style={{marginLeft: 8}} name="phone" size={22} color={"grey"} />
        <TextInput
          placeholder={profile.phone}
          style={[styles.inputText,  appStyles.default.defaultFont]}
          secureTextEntry={false}
          onChangeText={(event) => setPhone(event)}
          value={phone}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.containerForm}>
        <Icon style={{marginLeft: 8, marginRight: 8}} name="lock" size={22} color={"grey"} />
        <TextInput
          placeholder= "Contraseña"
          inputStyle={[styles.inputText, appStyles.default.defaultFont]}
          secureTextEntry={true}
          onChangeText={(event) => setPassword(event)}
          value={password}
        />
      </View>

      <Pressable
        style={styles.containerS}
         onPress={update}
      >
        <Text style={[styles.submitText,appStyles.default.defaultFont]}>Actualizar</Text>
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
      marginLeft:"10%",
      },
   containerS: {
        borderRadius: 4,
        backgroundColor: "rgba(118, 159, 94, 0.6)",
        width: "30%",
        height: 50,
        alignItems: 'center',
        justifyContent: "center",
        marginTop: "5%",
        marginLeft: "10%",
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
        marginLeft: 8,
        width: '100%',
        fontSize: 13,
        color: "#7F7F7F",
      },
      updatecover:{ 
        width: 31,
        height: 31,
        bottom: 25,
        left: 19,
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
