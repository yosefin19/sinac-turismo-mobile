import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SignUp from './screen/SignUp';
import Login from './screen/Login';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
        <Stack.Navigator initialRouteName="SignUp">
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
            <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
        </Stack.Navigator>
);
};
export default Navigation;
