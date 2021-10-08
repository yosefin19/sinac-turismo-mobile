import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import Navigation from './src/Navigation'

export default class App extends Component   {
  render() {
    return (

    <NavigationContainer style={styles.container}>
      <Navigation /> 
    </NavigationContainer>
        
      
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
