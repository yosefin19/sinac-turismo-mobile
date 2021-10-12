import React from "react";
import {StyleSheet, Text, View} from "react-native";

const About = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Text>Acerca de Nosotros</Text>
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

export default About;