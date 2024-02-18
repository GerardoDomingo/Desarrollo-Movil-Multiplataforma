import React, { useEffect, useState } from 'react';
import { Text, View, Image, TextInput, StyleSheet, FlatList } from 'react-native';

const Encabezado = () => {
  return (
    <View style={styles.encabezado}>
      <Image style={styles.logo} source={require('./assets/rickymorty.jpg')} />
    </View>
  );
};

const TarjetaPersonaje = ({ personaje }) => {
  return (
    <View style={styles.tarjeta}>
      {personaje.imagen && (
        <Image style={styles.imagen} source={{ uri: personaje.imagen }} />
      )}
      <View style={styles.detalles}>
        <Text style={styles.nombre}>{personaje.nombre}</Text>
        <Text>Estado: {personaje.estado}</Text>
        <Text>Especie: {personaje.especie}</Text>
        <Text>Género: {personaje.género}</Text>
      </View>
    </View>
  );
};

const PersonajesRickYMorty = () => {
  const [personajes, setPersonajes] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const data = await response.json();
        const characters = data.results.map(character => ({
          identificación: character.id,
          nombre: character.name,
          estado: character.status,
          especie: character.species,
          género: character.gender,
          imagen: character.image
        }));
        setPersonajes(characters);
      } catch (error) {
        console.error('Error al obtener los personajes:', error);
      }
    }

    fetchData();
  }, []);

  const filtrarPorNombre = (nombre) => {
    setFiltroNombre(nombre);
  };

  const personajesFiltrados = personajes.filter(personaje =>
    personaje.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
  );

  return (
    <View style={styles.contenedor}>
      <Encabezado />
      <TextInput
        style={styles.input}
        placeholder="Buscar por nombre"
        onChangeText={filtrarPorNombre}
        value={filtroNombre}
      />
      <FlatList
        data={personajesFiltrados}
        renderItem={({ item }) => <TarjetaPersonaje personaje={item} />}
        keyExtractor={(item) => item.identificación.toString()}
        contentContainerStyle={styles.tarjetasContainer}
        numColumns={3} // Número de columnas en la lista
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: 'black',
    padding: 15,
  },
  encabezado: {
    alignItems: 'center',
    marginBottom: 5,
    padding: 20,
  },
  logo: {
    width: 300,
    height: 65,
  },
  tarjeta: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    width: '30%', // Tamaño de cada tarjeta
    alignItems: 'center', // Centrar la imagen
  },
  tarjetasContainer: {
    justifyContent: 'space-between',
  },
  imagen: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  detalles: {
    padding: 10,
  },
  nombre: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderRadius: 20, // Agregar borde redondeado
    borderColor: 'green', // Color del borde
    borderWidth: 3, // Ancho del borde
    marginBottom: 10,
    paddingLeft: 20,
    color: 'green',
    backgroundColor: 'white',
  },
});

export default PersonajesRickYMorty;