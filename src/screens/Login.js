import React from 'react';
import { Component } from 'react';
import { Pressable, StyleSheet, Text, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SignUp extends Component {    
  constructor(props) {
    super(props);
    this.state = { 
    email:'',
    password:'',

  };
    this.Login = this.Login.bind(this);
    this.SignUp = this.SignUp.bind(this);
  }
    Login() {

        
       }
    SignUp() {
        navigation.navigate(to, route)
        
    }
    render(){
    return (
            <View style={styles.container}>    
                      

                <View style={[styles.containerV, {borderColor: '#eeee'}]}>
                <Icon  name = "envelope"  size={22}   color={ 'grey'} />
               <TextInput 
                    placeholder= 'Correo electronico'
                    style={styles.inputText}
                    secureTextEntry={false}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}    
                />
                </View>

                <View style={[styles.containerV, {borderColor: '#eeee'}]}>
                <Icon  name = "lock"  size={22}   color={ 'grey'} />
               <TextInput 
                    placeholder= 'Contraseña'
                    style={styles.inputText}
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}   
                    keyboardType="numeric" 
                />
                </View>

                <Pressable style={[styles.containerS, {backgroundColor: '#769E5F'}]} onPress ={this.Login}>
                     <Text style={styles.submitText}>Ingresar</Text>
                </Pressable>

            <View style={styles.container}>
                <Text>No tiene una cuenta?</Text>
            </View>
                <Pressable style={[styles.containerS, {backgroundColor: '#769E5F'}]} onPress ={this.SignUp}>
                     <Text style={styles.submitText}>Registrar</Text>
                </Pressable>

           
              
        </View>   
    );

              }
        };


const styles = StyleSheet.create({
      containerV: {
        flexDirection: 'column',
        width: '90%',
        height: 50,
        borderRadius: 100,
        marginVertical: 10,
        borderWidth: 3.5
        
    },
    container: {
        marginTop: '50%',
        alignItems: 'center',
    },
    containerS: {
        width: '35%',
        borderRadius: 15,
        marginVertical: 20
    },
    textTitle: {
        fontSize: 20,
        marginVertical: 5,
    },
    inputText: {
    fontSize: 20,
    color: 'black',
    marginLeft: 15
  },
  submitText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'grey',
    alignSelf: 'center',
    marginVertical: 5
}
});
