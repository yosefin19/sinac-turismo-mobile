import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Pressable, Image, ScrollView, Dimensions} from "react-native";
import Icon from "react-native-vector-icons/Fontisto";
import GalleryList from '../components/GalleryList'

import { CredentialsContext } from "../CredentialsContext";

import { API_URL, IMAGE_BASE_URL} from "../config";
let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;
// Imagenes
import Exit from "../images/exit.png";
import defaultProfile from "../images/defaultProfile.png"
import defaultCover from "../images/defaultCover.jpg"

// Estilos globales
const appStyles = require("../appStyle");

const MyProfile = ({navigation}) => {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const [name, setName] = useState("");
    //fotos de la galeria
    const [profile_photo, setProfile] = useState("");
    const [cover_photo, setCover] = useState("");
    //Todos los datos del perfil
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState(0);

    const changeToDestination = () => {
      if (state !== 0) setState(0);
    };
    const changeToGallery = () => {
      if (state !== 1) setState(1);
    };
 
    useEffect(() => {
      const endpoint = API_URL+ 'profile';
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
              if(data.cover_photo_path == "/"){
                  setCover(require("../images/defaultCover.jpg"));}
              else {
                  setCover({uri:`${IMAGE_BASE_URL}${data.cover_photo_path}`});
              }
              if(data.profile_photo_path == "/"){
                setProfile(require("../images/defaultProfile.png"));}
              else {
              setProfile({uri:`${IMAGE_BASE_URL}${data.profile_photo_path}`});
              }  
            })
          .catch((error) => console.error(error))
          .finally(() => {
            setLoading(false);    
            }
        );
   
      
      }, []);

    return loading ? (
      <View style={{ height: "100%", justifyContent: "center" }}>
          <Text>Cargando...</Text>
      </View>
  ) : (
        <ScrollView>
                    <View >

                        <Image source={cover_photo} style={styles.cover} /> 
 
                    </View>                       
                    <View style={{alignItems:'center'}}>
                            <Image source={profile_photo} style={styles.profileImage}/>
                            <Text>{name}</Text>
                        </View>
                    <View style={[appStyles.default.exitView, { elevation: 31 }]}>
                        <Image style={appStyles.default.exitImage} source={Exit} />
                    </View>


                    <Pressable style={styles.update} onPress={() => {
                              navigation.navigate("Update", { profile: user });
                        }}>
                    <Icon name="player-settings" size={21} color={"grey"} />
                     </Pressable>
            <ScrollView> 

        <View style={styles.optionsContainer}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={[styles.optionsText, appStyles.default.defaultFont]}
              onPress={changeToDestination}
            >
              Destinos
            </Text>
            {state === 0 && (
              <View style={styles.selectedLine}/>
            )}

          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={[styles.optionsText, appStyles.default.defaultFont]}
              onPress={changeToGallery} >
              Galeria
            </Text>
            {state === 1 && (
              <View
                style={styles.selectedLine }
              />
            )}
          </View>


 </View>

        {state === 0 /** aqui se agrega visitados y recomendados */}

        {state === 1 && (
            <ScrollView>
              <View style={styles.container}>
              <GalleryList navigation={navigation} />
                </View>
            </ScrollView>
            
        )}      

            </ScrollView>
        </ScrollView>
        )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 10,
  },
    text: {
        color: "#52575D"
    },
    profileImage: {
        width: 140,
        height: 140,
        borderRadius: 100,
        marginTop: -70,
    },   
    update:{
        position: 'absolute', 
        right: 19,
        width: 31,
        height: 31,
        backgroundColor: "#F0F0F0",
        borderRadius: 60,
        top: 19,
        alignItems: "center",
        justifyContent: "center"
    },
    cover:{
        flex: 1,
        width: deviceWidth,
        height:deviceHeight*0.25,
    },
      optionsContainer: {
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent: "center"
      },
      selectedLine: {
        borderWidth: 1,
        borderColor: "#DD9B5E",
        width: "100%",
        position: "absolute",
        marginTop:12,
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


});
export default MyProfile;