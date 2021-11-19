import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import DisplayWeather from './components/DisplayWeather';
import SearchCountry from './components/SearchCountry';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';

function Weather(props) {
  const [coords, setCoords] = useState({
    latitude: 16,
    longitude: 108,
  });
  const [weather, setWeather] = useState({});
  const [input, setInput] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let newCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        console.log(newCoords);
        setCoords(newCoords);

        axios
          .get(
            `http://api.weatherstack.com/current?access_key=96da1ddd655a0e37fdf4363d9acbb1ae&query=${coords.latitude},${coords.longitude}`
          )
          .then((res) => {
            let userWeather = {
              temperature: res.data.current.temperature,
              description: res.data.current.weather_descriptions[0],
              location: res.data.location.name,
              region: res.data.location.region,
              country: res.data.location.country,
              wind_speed: res.data.current.wind_speed,
              pressure: res.data.current.pressure,
              precip: res.data.current.precip,
              humidity: res.data.current.humidity,
              img: res.data.current.weather_icons,
            };
            setWeather(userWeather);
          });
      });
    } else {
      console.log('notsuported');
    }
  }, [coords.latitude, coords.longitude]);

  const changeInput = (value) => {
    setInput(value);
  };
  const changeLocation = (e) => {
    e.preventDefault();
    try {
      axios
        .get(`http://api.weatherstack.com/current?access_key=96da1ddd655a0e37fdf4363d9acbb1ae&query=${input}`)
        .then((res) => {
          console.log(res);
          if (res.data.success === false) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: 'Thành phố không hỗ trợ' } });
          } else {
            let userWeather = {
              temperature: res.data.current.temperature,
              description: res.data.current.weather_descriptions[0],
              location: res.data.location.name,
              region: res.data.location.region,
              country: res.data.location.country,
              wind_speed: res.data.current.wind_speed,
              pressure: res.data.current.pressure,
              precip: res.data.current.precip,
              humidity: res.data.current.humidity,
              img: res.data.current.weather_icons,
            };
            setWeather(userWeather);
            dispatch({ type: GLOBALTYPES.ALERT, payload: { success: 'Success' } });
          }
        });
    } catch (error) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: 'Thành phố không hỗ trợ' });
    }
  };
  return (
    <div>
      <SearchCountry changeLocation={changeLocation} changeWeather={changeInput} />
      <DisplayWeather weather={weather} />
    </div>
  );
}

export default Weather;
