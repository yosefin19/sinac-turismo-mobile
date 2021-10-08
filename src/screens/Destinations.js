import React from "react";
import {StyleSheet, Text, View} from "react-native";

const Destination = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Text>Áreas de Conservación y Destinos Turísticos</Text>
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

export default Destination;