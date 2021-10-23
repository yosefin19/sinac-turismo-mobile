import {Image, StyleSheet, Text, View} from "react-native";
import { RadioButton } from 'react-native-paper';
import React, {useState} from "react";

import Sun from "../images/sun.png";
import Volcano from "../images/volcano.png";
import Mountain from "../images/mountain.png";
import Forest from "../images/forest.png";


const TagsFilter = () => {
    const [beachTag, setBeachTag] = useState(false);
    const [mountainTag, setMountainTag] = useState(false);
    const [volcanoTag, setVolcanoTag] = useState(false);
    const [forestTag, setForestTag] = useState(false);



    return (
        <View style={styles.container}>
            <Text
                style={[
                    styles.titleText,
                    {marginLeft: 5},
                ]}
            >
                Selecciona tus opciones
            </Text>
            <View style={styles.filterBox}>
                <View style={styles.filterComponent}>
                    <View style={styles.filterContent}>
                        <Image style={{width: 38, height: 24,}} source={Sun}/>
                        <Text style={styles.filterContentText}>playa</Text>
                        <RadioButton
                            value={beachTag}
                            status={ beachTag ? 'checked' : 'unchecked'}
                            onPress={() => setBeachTag(!beachTag)}
                            color='rgba(118, 159, 94, 0.6)'
                            uncheckedColor='rgba(118, 159, 94, 0.6)'
                        />
                    </View>
                    <View style={styles.filterContent}>
                        <Image style={{width: 40, height: 20,}} source={Mountain}/>
                        <Text style={styles.filterContentText}>montaña</Text>
                        <RadioButton
                            value={mountainTag}
                            status={ mountainTag ? 'checked' : 'unchecked'}
                            onPress={() => setMountainTag(!mountainTag)}
                            color='rgba(118, 159, 94, 0.6)'
                            uncheckedColor='rgba(118, 159, 94, 0.6)'
                        />
                    </View>
                    <View style={styles.filterContent}>
                        <Image style={{width: 40, height: 22,}} source={Volcano}/>
                        <Text style={styles.filterContentText}>volcán</Text>
                        <RadioButton
                            value={volcanoTag}
                            status={ volcanoTag ? 'checked' : 'unchecked'}
                            onPress={() => setVolcanoTag(!volcanoTag)}
                            color='rgba(118, 159, 94, 0.6)'
                            uncheckedColor='rgba(118, 159, 94, 0.6)'
                        />
                    </View>
                    <View style={styles.filterContent}>
                        <Image style={{width: 40, height: 31,}} source={Forest}/>
                        <Text style={styles.filterContentText}>bosques</Text>
                        <RadioButton
                            style={styles.filterContentRadio}
                            value={forestTag}
                            status={ forestTag ? 'checked' : 'unchecked'}
                            onPress={() => setForestTag(!forestTag)}
                            color='rgba(118, 159, 94, 0.6)'
                            uncheckedColor='rgba(118, 159, 94, 0.6)'
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "80%",
        backgroundColor: "#F3F2F2",
        margin: "7%",
    },
    titleText: {
        fontFamily: "Segoe UI",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: 12,
        lineHeight: 12,
        color: 'rgba(123, 123, 123, 0.56)',
    },
    filterBox: {
        backgroundColor: "#F3F2F2",
        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },
    filterComponent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: "2%",
    },
    filterContent: {
        marginLeft: "4%",
        marginRight: "4%",
        flexDirection: "column",
        alignItems: "center"
    },
    filterContentText: {
        fontFamily: "Segoe UI",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: 14,
        lineHeight: 16,
        textAlign: "center",
        color: 'rgba(118, 159, 94, 0.6)',
        margin: 3,
    },
    filterContentRadio: {
        margin: 3,
    }
});

export default TagsFilter;