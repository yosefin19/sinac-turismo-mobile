import React from 'react';
import { Component } from 'react';
import { Pressable, StyleSheet, Text, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SignUp extends Component {    
  constructor(props) {
    super(props);
    this.state = { 
    name: '',
    email:'',
    phone:'',
    password:'',
    CPassord:'',
    id_user:''
  };
    this.Agregar = this.Agregar.bind(this);
  }
    Agregar() {

      //Agregar usuario
      const requestOptionsUser = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email:this.state.email, password: this.state.password, admin:false})
      };
        fetch('http://192.168.0.12:8000/add-user', requestOptionsUser)
        .then(response => response.json())
        .then((data) => {this.setState({id_user: data.id})})

      //Agregar perfil
        const requestOptionsProfile = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({email:this.state.email, name:this.state.name, phone: this.state.phone, user_id: this.state.id_user, profile_photo_path: null, cover_photo_path:null})
        };
          fetch('http://127.0.0.1:8000/add-profile', requestOptionsProfile)
          .then(response => response.json())
         
        
       }
    render(){
    return (
            <View style={styles.container}>    
               <Text style={styles.textTitle}>Crear una cuenta</Text>

               <View style={[styles.containerV, {borderColor: '#eeee'}]}>
                <Icon  name = "user"  size={22}   color={ 'grey'} />
               <TextInput 
                    placeholder= 'Nombre'
                    style={styles.inputText}
                    secureTextEntry={false}
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}    
                />
                </View>


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
                <Icon  name = "phone"  size={22}   color={ 'grey'} />
               <TextInput 
                    placeholder= 'Numero telefonico'
                    style={styles.inputText}
                    secureTextEntry={false}
                    onChangeText={(phone) => this.setState({phone})}
                    value={this.state.phone}   
                    keyboardType="numeric" 
                />
                </View>

                <View style={[styles.containerV, {borderColor: '#eeee'}]}>
                <Icon  name = "lock"  size={22}   color={ 'grey'} />
               <TextInput 
                    placeholder= 'Contraseña'
                    inputStyle={styles.inputText}
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}   
                    keyboardType="numeric" 
                />
                </View>

                <Pressable style={[styles.containerS, {backgroundColor: '#769E5F'}]} onPress ={this.Agregar}>
                     <Text style={styles.submitText}>Registrar</Text>
                </Pressable>
                
              
            </View>   
    );

              }
        };


const styles = StyleSheet.create({
      containerV: {
        width: '90%',
        height: 50,
        borderRadius: 100,
        marginVertical: 10,
        borderWidth: 3.5
        
    },
    containerS: {
      width: '35%',
      borderRadius: 15,
      marginVertical: 20
  },
  submitText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'grey',
    alignSelf: 'center',
    marginVertical: 5
},
    container: {
        marginTop: 200,
        alignItems: 'center',
    },

    textTitle: {
        fontSize: 20,
        marginVertical: 5
    },
    inputText: {
      color: '#9999',
      marginLeft: 5
  }
});
