import React, {useState, useContext} from "react";
import { View, Pressable, Dimensions, StyleSheet, Image} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CredentialsContext } from "../CredentialsContext";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;
import { API_URL,IMAGE_BASE_URL} from "../config";

const GalleryImage = ({route, navigation}) => {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const {name} = route.params;

    
    const Delete = () => {
  
        const url =  `${API_URL}delete-photo`;
        const requestOptions = {
        method: 'DELETE',        
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + storedCredentials ,
          },
        body: JSON.stringify({name: name })
    };
         fetch(url, requestOptions)
        .then(response => response.json())
        .then((data) => { console.log(data)})
        .catch((error) => console.error(error))
        navigation.navigate("MyProfile")
    }

    return(
        <View style={styles.containerV}>
            <Image source = {{uri:`${IMAGE_BASE_URL}${name}`}}  style={styles.image} resizeMode="contain" />
            <Pressable style={styles.update} onPress={Delete}>
                    <Icon name="delete-sweep" size={21} color={"grey"} />
            </Pressable>

        </View>
    )


}

const styles = StyleSheet.create({
    
    container: {
        display: 'flex',
        
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
    image:{
        height: deviceHeight/2,
        width: deviceWidth,
    }
})

export default GalleryImage;