const {default: axios} = require('axios');
const {apiKey} = require('../constants');

const locationEndpoint = params =>
  `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;

const forecastEndpoint = params =>
  `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=1&aqi=no&alerts=no`;

const makeCall = async endPoint => {
  const options = {
    method: 'GET',
    url: endPoint,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log('Error while making call to weather api', error);
    return null;
  }
};

export const fetchLocation = params => {
  return makeCall(locationEndpoint(params));
};

export const fetchWeatherForecast = params => {
  return makeCall(forecastEndpoint(params));
};
