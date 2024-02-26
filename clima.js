import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Función para obtener los datos meteorológicos
const fetchWeatherData = async () => {
    try {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=d069d9671c254170bae193456231210&q=Huejutla de Reyes&days=5&aqi=no&alerts=no');
        if (!response.ok) {
            throw new Error('Error al cargar los datos meteorológicos');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};

// Componente para mostrar cada tarjeta de pronóstico horario
const HourlyForecastCard = ({ time, temp, iconUrl }) => (
    <TouchableOpacity style={[styles.card, styles.shadow]}>
        <Text style={styles.cardDate}>{time}</Text>
        <Image style={styles.cardImage} source={{ uri: iconUrl }} />
        <Text style={styles.cardTemp}>{temp}°C</Text>
    </TouchableOpacity>
);

// Componente para mostrar el clima actual
const CurrentWeather = ({ weatherData }) => {
    const currentHour = new Date().getHours(); // Obtiene la hora actual en formato 24 horas

    // Filtra para obtener solo las horas desde la hora actual en adelante
    const filteredHours = weatherData.forecast.forecastday[0].hour.filter(item => {
        return new Date(item.time).getHours() >= currentHour;
    });

    return (
        <View style={[styles.weatherContainer, styles.currentWeatherContainer]}>
            <View style={styles.weatherScreen}>
                {/* Nombre de la ubicación */}
                <Text style={styles.locationName}>{weatherData.location.name}</Text>
                {/* Imagen de la condición climática actual */}
                <Image
                    style={styles.currentConditionImage}
                    source={{ uri: `https:${weatherData.current.condition.icon}` }} // Corregir la URL aquí
                />
                {/* Temperatura actual */}
                <Text style={styles.currentTemp}>{weatherData.current.temp_c}°C</Text>
                {/* Texto de la condición climática actual y temperatura máxima/mínima */}
                <Text style={styles.conditionText}>
                    {weatherData.current.condition.text} - {weatherData.forecast.forecastday[0].day.maxtemp_c}°C / {weatherData.forecast.forecastday[0].day.mintemp_c}°C
                </Text>
                {/* Encabezado del pronóstico horario */}
                <Text style={styles.hourlyHeader}>Pronóstico del día</Text>
                {/* Lista horizontal del pronóstico horario */}
                <FlatList
                    data={filteredHours}
                    renderItem={({ item }) => (
                        <HourlyForecastCard
                            time={`${new Date(item.time).getHours()}:00`} // Corregir la interpolación de cadena aquí
                            temp={item.temp_c}
                            iconUrl={`https:${item.condition.icon}`} // Corregir la URL aquí
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.hourlyList}
                />
            </View>
        </View>
    );
};

// Componente para mostrar cada elemento del pronóstico semanal
const WeeklyWeather = ({ forecast }) => {
    // Verificar si forecast está definido antes de acceder a forecast.forecastday
    if (!forecast || !forecast.forecastday) {
        return (
            <View style={styles.weatherContainer}>
                <Text style={styles.errorText}>No se pudo cargar el pronóstico semanal.</Text>
            </View>
        );
    }

    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    // Función para renderizar cada elemento del pronóstico semanal
    const renderItem = ({ item }) => {
        const date = new Date(item.date);
        const dayOfWeek = daysOfWeek[date.getDay()];
        return (
            <View style={[styles.weeklyWeatherItem, styles.shadow]}>
                {/* Día de la semana */}
                <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
                <View style={styles.weatherDetails}>
                    {/* Temperatura máxima/mínima */}
                    <Text style={styles.temperature}>{item.day.maxtemp_c}°C / {item.day.mintemp_c}°C</Text>
                    {/* Icono de la condición climática */}
                    <Image style={styles.weatherIcon} source={{ uri: `https:${item.day.condition.icon}` }} />
                </View>
            </View>
        );
    };

    return (
        <View style={[styles.weatherContainer, styles.weeklyWeatherContainer]}>
            {/* Lista del pronóstico semanal */}
            <FlatList
                data={forecast.forecastday}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.weeklyWeatherList}
            />
        </View>
    );
};

// Componente principal para la aplicación de clima
const Clima = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Efecto para cargar los datos meteorológicos al montar el componente
    useEffect(() => {
        const loadData = async () => {
            const data = await fetchWeatherData();
            setWeatherData(data);
            setIsLoading(false);
        };
        loadData();
    }, []);

    // Si se están cargando los datos, muestra un indicador de carga
    if (isLoading) {
        return (
            <LinearGradient colors={['#662d8c', '#92278f', '#bb278c']} style={styles.linearGradient}>
                <View style={styles.loadingScreen}>
                    <ActivityIndicator size="large" color={'#FFF'} />
                    <Text style={styles.loadingText}>Cargando datos...</Text>
                </View>
            </LinearGradient>
        );
    }

    // Cuando se cargan los datos, muestra el clima actual y el pronóstico semanal
    return (
        <LinearGradient colors={['#2E0854', '#2E0854', '#662d8c']} style={styles.linearGradient}>
            <View style={styles.container}>
                <CurrentWeather weatherData={weatherData} />
                <WeeklyWeather forecast={weatherData.forecast} />
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    loadingScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        marginTop: 10,
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18,
    },
    weatherContainer: {
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    currentWeatherContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        marginHorizontal: 5,
        padding: 30,
        borderRadius: 20,
        marginTop: 30,
    },
    weeklyWeatherContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)', 
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 20,
        marginBottom: 40,
    },
    weatherScreen: {
        alignItems: 'center',
    },
    locationName: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 20,
    },
    currentConditionImage: {
        width: 130,
        height: 50,
        marginBottom: 10,
    },
    currentTemp: {
        fontSize: 60,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 5,
    },
    conditionText: {
        textAlign: 'center',
        marginBottom: 15,
        color: '#FFF',
    },
    hourlyHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 5,
    },
    hourlyList: {
        marginBottom: 20,
    },
    card: {
        alignItems: 'center',
        padding: 5,
      
        borderRadius: 50,
        marginHorizontal: 4,
    },
    cardDate: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFF',
    },
    cardImage: {
        height: 60,
        width: 60,
        marginVertical: 5,
    },
    cardTemp: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFF',
    },
    weeklyWeatherList: {
        paddingHorizontal: 1,
    },
    weeklyWeatherItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
        borderRadius: 30,
        marginBottom: 5,
    },
    dayOfWeek: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#FFF',
    },
    weatherDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    temperature: {
        fontSize: 15,
        marginRight: 10,
        color: '#FFF',
    },
    weatherIcon: {
        width: 40,
        height: 40,
    },
    container:{
        padding:13
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default Clima;
