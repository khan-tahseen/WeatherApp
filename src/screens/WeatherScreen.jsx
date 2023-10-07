import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import axios from 'axios';

const WeatherScreen = ({route}) => {
  const {city} = route.params;
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = '552658435a7346e5864175857230410';
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=no&alerts=no`,
        );
        // console.log('response.data =>', JSON.stringify(response.data, 0, 2));
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  const {location, current} = weatherData;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error fetching weather data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Weather in {location?.name}:</Text>
      <Text>Temperature: {current?.temp_c}°C</Text>
      <Text>Weather: {current?.condition?.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
  },
});

export default WeatherScreen;
