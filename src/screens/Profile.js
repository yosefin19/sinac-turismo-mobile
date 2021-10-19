import React, {useContext} from "react";
import {StyleSheet, Text, View} from "react-native";
import {CredentialsContext} from "../CredentialsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SECRET} from "../config";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const Profile = ({navigation}) => {
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

    const ClearLogin = () => {
        AsyncStorage.removeItem(SECRET)
            .then(() => {
                setStoredCredentials("");
            })
            .catch((error) => console.log(error));
    };

    return (
        <View style={styles.container}>
            <View>
                <Text>{storedCredentials ? storedCredentials : "null"}</Text>
            </View>
            <Pressable onPress={ClearLogin}>
                <Text style={styles.aboutText}>Salir</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#F0F0F0',
            alignItems: 'center',
            justifyContent: 'center',
        },
    }
);

export default Profile;