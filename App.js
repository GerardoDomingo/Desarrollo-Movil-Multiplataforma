import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleUsernameFocus = () => {
    setUsernameFocused(true);
    setPasswordFocused(false);
  };

  const handlePasswordFocus = () => {
    setUsernameFocused(false);
    setPasswordFocused(true);
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title]}>NE
        <Text style={{ fontSize: 28  }}>TF</Text>
        LIX
        </Text>
 
      </View>

      <View style={[styles.inputView, { borderColor: usernameFocused ? 'black' : 'gray' }]}>
        <Text style={[styles.label, { top: usernameFocused || username ? 1 : 20, left: 18, fontSize: 15, color: 'white' }]}>
          Email o número de telefono
        </Text>
        <TextInput
          style={styles.input}
          onFocus={handleUsernameFocus}
          onBlur={() => setUsernameFocused(false)}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>

      <View style={[styles.inputView, { borderColor: passwordFocused ? 'black' : 'gray' }]}>
        <Text style={[styles.label, { top: passwordFocused || password ? 1 : 20, left: 18, fontSize: 15, color: 'white' }]}>
          Contraseña
        </Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onFocus={handlePasswordFocus}
          onBlur={() => setPasswordFocused(false)}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={() => alert('Inicio de sesión')}>
        <Text style={styles.loginText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <View style={styles.additionalTextContainer}>
   <Text style={styles.additionalText}>¿Olvidaste la contraseña?</Text>
   <Text style={styles.additionalText}>¿Primera vez en Netflix? Suscríbete ya.</Text>
   </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          El inicio de sesión está protegido por Google reCAPTCHA para comprobar que no eres un robot.{' '}
          <Text style={{ color: 'white' }}>Más info.</Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100, // Ajusta la distancia desde la parte superior
  },
  header: {
    position: 'absolute',
    top: 10, // Ajusta la distancia desde la parte superior
    left: 10,
  },
  title: {
    fontSize: 30,
    color: 'red',
    padding: 10,
    fontWeight: 'bold',
  },
  inputView: {
    width: '80%',
    backgroundColor: 'gray',
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 34,
    borderWidth: 1,
    position: 'relative',
  },
  label: {
    position: 'absolute',
  },
  input: {
    height: 50,
    color: 'white',
    fontSize: 18,
  },
  additionalTextContainer: {
    marginTop: 20,
    alignItems: 'center',
    fontSize: 17,
     fontWeight: 'bold',
  },
  additionalText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: 'black',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 20,
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  footer: {
    marginTop: 20,
    paddingHorizontal: 20,
    textAlign: 'center',
  
  },
  footerText: {
    color: 'white',
  },
});
