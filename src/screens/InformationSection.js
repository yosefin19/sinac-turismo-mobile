import React, {useEffect, useState} from "react";
import {Pressable, Text, View} from "react-native";
import {API_URL, AREAS_URL} from "../config";

const InformationSection = ({navigation}) => {
    const [area, setArea] = useState({});
    const [loading, setLoading] = useState(true);

    const endpoint = `${API_URL}${AREAS_URL}1`;

    useEffect(() => {
        let isMounted = true;
        fetch(endpoint)
            .then((response) => response.json())
            .then((json) => setArea(json))
            .catch((error) => console.error(error))
            .finally(() => {
                isMounted = false;
                setLoading(false);
            });
    }, []);


    return loading ? (
        <View style={{ height: "100%", justifyContent: "center" }}>
            <Text>Cargando...</Text>
        </View>
    ) : (
        <View
            style={[
                {
                    flex: 1,
                    backgroundColor: "#f0f0f0",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                },
            ]}
        >
            <Pressable
                onPress={() => {
                    navigation.navigate("Area", { area: area });
                }}
            >
                <Text>Test area with id 1!</Text>
            </Pressable>
        </View>
    );
}


export default InformationSection;