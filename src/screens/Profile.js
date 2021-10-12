import React from "react";
import {StyleSheet, Text, View} from "react-native";

const Profile = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Text>Perfil</Text>
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