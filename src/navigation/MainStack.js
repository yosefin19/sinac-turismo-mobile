import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Profile from "../screens/Profile";
import About from "../screens/About";
import Destination from "../screens/Destinations";

/***
 * Pila de Ventanas de la Aplicación
 */
const Stack = createNativeStackNavigator()

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
                name="Destination"
                component={Destination}
            />
            <Stack.Screen
                name = "Profile"
                component={Profile}
            />
            <Stack.Screen
                name="About"
                component={About}
            />
        </Stack.Navigator>
    );
};

export default MainStack;