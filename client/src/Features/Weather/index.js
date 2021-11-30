import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';
import DisplayWeather from './components/DisplayWeather';
import SearchCountry from './components/SearchCountry';

const useStyles = makeStyles((theme) => ({
  bgImg: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: 'calc(100vh - 65px)',
    margin: '0 auto',
    color: 'white',
  },
}));

function Weather(props) {
  const classes = useStyles();
  const [coords, setCoords] = useState({
    latitude: 16,
    longitude: 108,
  });
  const [weather, setWeather] = useState({});
  const [input, setInput] = useState('');
  const [icon, setIcon] = useState('');

  const dispatch = useDispatch();

  const convert = (temp) => {
    let cell = Math.floor(temp - 273.15);
    return cell;
  };
  const getWeatherIcon = (rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        setIcon('wi-thunderstorm');
        break;
      case rangeId >= 300 && rangeId <= 321:
        setIcon('wi-sleet');
        break;
      case rangeId >= 500 && rangeId <= 521:
        setIcon('wi-storm-showers');
        break;
      case rangeId >= 600 && rangeId <= 622:
        setIcon('wi-snow');
        break;
      case rangeId >= 701 && rangeId <= 781:
        setIcon('wi-fog');
        break;
      case rangeId === 800:
        setIcon('wi-day-sunny');
        break;
      case rangeId >= 801 && rangeId <= 804:
        setIcon('wi-day-fog');
        break;
      default:
        setIcon('wi-day-fog');
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let newCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setCoords(newCoords);

        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=f6c091e438c44935ca691b47cddc0b8f`
          )
          .then((res) => {
            let userWeather = {
              city: res.data.name,
              country: res.data.sys.country,
              wind: res.data.wind.speed,
              celsius: convert(res.data.main.temp),
              temp_max: convert(res.data.main.temp_max),
              temp_min: convert(res.data.main.temp_min),
              description: res.data.weather[0].description,
              humidity: res.data.main.humidity,
              pressure: res.data.main.pressure,
              gust: res.data.wind.gust,
            };
            getWeatherIcon(res.data.weather[0].id);
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
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=f6c091e438c44935ca691b47cddc0b8f`)
        .then((res) => {
          if (res === '') {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: 'Thành phố không hỗ trợ' } });
          } else {
            let userWeather = {
              city: res.data.name,
              country: res.data.sys.country,
              wind: res.data.wind.speed,
              celsius: convert(res.data.main.temp),
              temp_max: convert(res.data.main.temp_max),
              temp_min: convert(res.data.main.temp_min),
              description: res.data.weather[0].description,
              humidity: res.data.main.humidity,
              pressure: res.data.main.pressure,
              gust: res.data.wind.gust,
            };
            getWeatherIcon(res.data.weather[0].id);
            setWeather(userWeather);
            dispatch({ type: GLOBALTYPES.ALERT, payload: { success: 'Success' } });
          }
        });
    } catch (error) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: 'Thành phố không hỗ trợ' });
    }
  };
  return (
    <div className={classes.bgImg}>
      <SearchCountry changeLocation={changeLocation} changeWeather={changeInput} />
      <DisplayWeather weather={weather} icon={icon} />
    </div>
  );
}

export default Weather;
