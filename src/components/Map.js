import * as React from "react"
import { Dimensions, StyleSheet, Text, View, Pressable, Linking } from "react-native"
import MapView from "react-native-maps"
import Icon from "react-native-vector-icons/Ionicons";

const Maps = ({latitude, longitude}) => {
	const latitudeDelta= 0.15;
	const longitudeDelta= 0.15;

	const open = () => {
	const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
	const latLng = `${latitude},${longitude}`;
	const url = Platform.select({
	  ios: `${scheme}@${latLng}`,
	  android: `${scheme}${latLng}`
	});
	Linking.openURL(url)
	}
	return (
		<View style={{flex: 1 }} >		 
		    <MapView
			style={styles.map}
				
				initialRegion={{
					latitude: latitude,
					longitude: longitude,
					latitudeDelta: latitudeDelta,
					longitudeDelta:longitudeDelta
				}}
				provider="google"
			/>
		<Pressable style={styles.update} onPress={() => {open()}}>
            <Icon name="send-outline" size={25} color={"grey"} />
        </Pressable>
			</View>
				
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height
	},
	update:{
        position: 'absolute', 
        right: 19,
        width: 45,
        height: 45,
		top: 19,
        backgroundColor: "#F0F0F0",
        borderRadius: 60,
        alignItems: "center",
        justifyContent: "center"
    },
});
export default  Maps;