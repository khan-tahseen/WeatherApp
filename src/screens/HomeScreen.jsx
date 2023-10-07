import {
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {MapPinIcon} from 'react-native-heroicons/solid';
import {theme} from '../constants';
import styles from './HomeScreen.style';
import {fetchLocations, fetchWeatherForecast} from '../components/weatherApi';
import {getData, setData} from '../../asyncStorage';

export default function HomeScreen() {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    let city = await getData('cityName');
    let defaultCity = 'London';
    if (city) defaultCity = city;
    fetchWeatherForecast({cityName: defaultCity}).then(data => {
      setWeather(data);
      setLoading(false);
    });
  };

  const handleLocation = loc => {
    console.log('handleLocation', loc);
    setLocations([]);
    setToggleSearch(false);
    fetchWeatherForecast({cityName: loc.name}).then(data => {
      // console.log('handleWeatherForecast', data)
      setWeather(data);
      setData('cityName', loc.name);
    });
  };

  const handleSearch = value => {
    if (value.length > 2) {
      fetchLocations({cityName: value}).then(data => {
        // console.log('handleSearch', data)
        setLocations(data);
      });
    }
  };

  const {current, location} = weather;

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['#192f6a', '#4c669f', '#3b5998']}
        style={{flex: 1}}>
        {!loading && (
          <SafeAreaView>
            {/* Search Section */}
            <View style={styles.container}>
              <View
                style={[
                  styles.innerContainer,
                  {
                    backgroundColor: toggleSearch
                      ? theme.bgWhite('0.2')
                      : 'transparent',
                  },
                ]}>
                {toggleSearch ? (
                  <TextInput
                    onChangeText={handleSearch}
                    placeholder="Search city"
                    placeholderTextColor={'lightgray'}
                    style={styles.input}
                  />
                ) : null}

                <TouchableOpacity
                  onPress={() => setToggleSearch(!toggleSearch)}
                  style={styles.icon}>
                  <MagnifyingGlassIcon size={24} color={'white'} />
                </TouchableOpacity>
              </View>

              {/* Search Suggestions */}
              {locations?.length > 0 && toggleSearch ? (
                <View style={styles.searchSuggestionContainer}>
                  {locations.map((loc, index) => {
                    let showBorder = index + 1 != locations.length;
                    let borderClass = showBorder
                      ? {borderBottomColor: 'gray', borderBottomWidth: 1}
                      : null;
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleLocation(loc)}
                        style={[styles.searchSuggestion, borderClass]}>
                        <MapPinIcon size={24} color="gray" />
                        <Text style={{fontSize: 16, marginLeft: 8}}>
                          {loc?.name}, {loc?.country}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : null}
            </View>
            {/* Forecast Section */}
            <View style={styles.locationName}>
              <Text style={styles.city}>{location?.name}, </Text>
              <Text style={styles.state}>{' ' + location?.country}</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: 'https:' + current?.condition?.icon,
                }}
                style={styles.image}
              />
            </View>
            <View style={{marginVertical: 32, alignItems: 'center'}}>
              <Text style={styles.degreeCelcius}>{current?.temp_c}&#176;</Text>
              <Text style={styles.weatherName}>{current?.condition?.text}</Text>
            </View>
            {/* Other state */}
            <View style={styles.otherStateContainer}>
              <Text style={styles.otherState}>{current?.wind_kph}km</Text>
              <Text style={styles.otherState}>{current?.humidity}%</Text>
              <Text style={styles.otherState}>
                {weather?.forecast?.forecastday[0]?.astro?.sunrise}
              </Text>
            </View>
          </SafeAreaView>
        )}
      </LinearGradient>
    </View>
  );
}
