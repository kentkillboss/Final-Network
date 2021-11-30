import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import 'weather-icons/css/weather-icons.css';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '40%',
    height: '75%',
    margin: '0 auto',
    textAlign: 'center',
    position: 'absolute',
    top: '20%',
    left: '30%',
    backgroundColor: 'rgb(0 0 0 / 50%)',
    borderRadius: '5px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      top: 140,
      left: 0,
      height: '100%',
    },
  },
  temperature: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '53px',
  },
  section: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '60px',
  },
}));

function DisplayWeather({ weather, icon }) {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <Box>
        <Typography variant="h4">
          {weather.city}, {weather.country}
        </Typography>
        <Box className={classes.temperature}>
          <Typography variant="h2" style={{ marginRight: '50px' }}>
            {weather.celsius}
            <sup>o</sup>C
          </Typography>
          <i className={`wi ${icon}`} style={{ fontSize: '63px' }}></i>
        </Box>
      </Box>
      <span style={{ marginRight: '10px', fontSize: '17px' }}>
        Max: {weather.temp_max}
        <sup>o</sup>C
      </span>
      <span style={{ fontSize: '17px' }}>
        Min: {weather.temp_min} <sup>o</sup>C
      </span>
      <Typography style={{ fontWeight: '500' }} variant="h5">
        {weather.description}
      </Typography>
      <Box className={classes.section}>
        <Box>
          <Typography variant="h5">
            <b>Wind Speed</b> (km/h)
          </Typography>
          <Typography variant="h4">{weather.wind}</Typography>
        </Box>
        <Box>
          <Typography variant="h5">
            <b>Preassure</b>(mil)
          </Typography>
          <Typography variant="h4">{weather.pressure}</Typography>
        </Box>
      </Box>
      <Box className={classes.section}>
        <Box>
          <Typography variant="h5">
            <b>Gust</b>
          </Typography>
          <Typography variant="h4">{weather.gust ? weather.gust : '...'}</Typography>
        </Box>
        <Box>
          <Typography variant="h5">
            <b>Humidity</b>(%)
          </Typography>
          <Typography variant="h4">{weather.humidity}</Typography>
        </Box>
      </Box>
    </div>
  );
}

export default DisplayWeather;
