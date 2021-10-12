import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Profile from "../screens/Profile";
import About from "../screens/About";
import InformationSection from "../screens/InformationSection";
import Area from "../screens/Area";
import Destination from "../screens/Destination";
import Region from "../screens/Region";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";

/***
 * Pila de Ventanas de la Aplicación
 */
const Stack = createNativeStackNavigator();


/***
 * Componente que proporciona la posibilidad de realizar transiciones
 * entre pantallas, donde cada ventana nueva se agrega en un pila.
 * @returns {JSX.Element}
 * @constructor
 */
const MainStack = () => {

    return(
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions = {{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
            />
            <Stack.Screen
                name="InformationSection"
                component={InformationSection}
            />
            <Stack.Screen
                name = "Profile"
                component={Profile}
            />
            <Stack.Screen
                name="About"
                component={About}
            />
            <Stack.Screen 
                name="Area" 
                component={Area}
            />
            <Stack.Screen 
                name="Destination" 
                component={Destination} 
            />
            <Stack.Screen 
                name="Region" 
                component={Region} 
            />
            <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUp}
            />
        </Stack.Navigator>
    );
};

export default MainStack;