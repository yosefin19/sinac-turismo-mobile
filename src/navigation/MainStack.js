import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Test from "../screens/Test";
import Area from "../screens/Area";
import Destination from "../screens/Destination";
import Region from "../screens/Region";

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
  return (
    <Stack.Navigator
      initialRouteName="Test"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="Area" component={Area} />
      <Stack.Screen name="Destination" component={Destination} />
      <Stack.Screen name="Region" component={Region} />
    </Stack.Navigator>
  );
};

export default MainStack;
