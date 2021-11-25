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
    <div className={classes.bgImg}>
      <SearchCountry changeLocation={changeLocation} changeWeather={changeInput} />
      <DisplayWeather weather={weather} />
    </div>
  );
}

export default Weather;
