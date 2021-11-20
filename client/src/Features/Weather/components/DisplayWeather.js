import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

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
    marginTop: '67px',
  },
}));

function DisplayWeather({ weather }) {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <Box>
        <Typography variant="h4">
          {weather.location}, {weather.country}
        </Typography>
        <Box className={classes.temperature}>
          <Typography variant="h2" style={{ marginRight: '50px' }}>
            {weather.temperature}
            <sup>o</sup>C
          </Typography>
          <img src={weather.img} alt="weather-img" width="18%" style={{ borderRadius: '50%' }} />
        </Box>
        <Typography variant="h5">{weather.description}</Typography>
      </Box>
      <Box className={classes.section}>
        <Box>
          <Typography variant="h5">
            <b>Wind Speed</b> (km/h)
          </Typography>
          <Typography variant="h4">{weather.wind_speed}</Typography>
        </Box>
        <Box>
          <Typography variant="h5">
            <b>Preassure</b>(millibar)
          </Typography>
          <Typography variant="h4">{weather.pressure}</Typography>
        </Box>
      </Box>
      <Box className={classes.section}>
        <Box>
          <Typography variant="h5">
            <b>Precipitation</b>(mm)
          </Typography>
          <Typography variant="h4">{weather.precip}</Typography>
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
