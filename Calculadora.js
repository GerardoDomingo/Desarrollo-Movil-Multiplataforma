import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const App = () => {
  const [display, setDisplay] = useState('0');

  const handleInput = (value) => {
    if (display === '0' && value !== '0' && value !== '.') {
      // Reemplazar el cero inicial por el valor ingresado si no es cero ni un punto
      setDisplay(value);
    } else if (value === '.' ) {
      setDisplay('0.');
      // Evitar múltiples puntos decimales
      return;
    } else {
      // Agregar el valor ingresado al final del número actual
      setDisplay(display === '0' ? value : display + value);
    }
  };

  const handleClear = () => {
    setDisplay('0');
  };

  const handleDelete = () => {
    setDisplay(display.slice(0, -1) || '0');
  };

  const calculate = () => {
    try {
      if (display.includes('/0')) {
        setDisplay('Syntax Error');
      } else {
        setDisplay(eval(display).toString());
      }
    } catch (error) {
      setDisplay('Error');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{display}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={handleClear}>
          <Text style={styles.buttonText}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Text style={styles.buttonText}>⌫</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleInput('%')}>
          <Text style={styles.buttonText}>%</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.operator]} onPress={() => handleInput('/')}>
          <Text style={styles.buttonText}>/</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleInput('7')}>
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleInput('8')}>
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleInput('9')}>
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.operator]} onPress={() => handleInput('*')}>
          <Text style={styles.buttonText}>*</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleInput('4')}>
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleInput('5')}>
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleInput('6')}>
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.operator]} onPress={() => handleInput('-')}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleInput('1')}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleInput('2')}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleInput('3')}>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.operator]} onPress={() => handleInput('+')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleInput('+/-')}>
          <Text style={styles.buttonText}>+/-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleInput('0')}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleInput('.')}>
          <Text style={styles.buttonText}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.operator]} onPress={calculate}>
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  display: {
    height: 225,
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#d8d3d3',
    backgroundColor: '#fdfdfd',
    padding: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  displayText: {
    fontSize: 30,
  },
  buttons: {
    width: 400,
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    width: 90,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    backgroundColor: '#000000',
    borderRadius: 100,
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
  },
  operator: {
    backgroundColor: '#4CAF50',
  },
});

export default App;

