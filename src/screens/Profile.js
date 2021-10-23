import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.containerS, { backgroundColor: "#769E5F" }]}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.submitText}>Registrar</Text>
      </Pressable>
      <Pressable
        style={[styles.containerS, { backgroundColor: "#769E5F" }]}
        onPress={}
      >
        <Text style={styles.submitText}>Ingresar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Profile;
