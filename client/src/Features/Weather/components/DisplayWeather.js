import React from 'react';

function DisplayWeather({ weather }) {
  return (
    <div className="user-weather">
      <div className="row">
        <div className="col-md-3 weather-temp">
          <h1>
            {weather.temperature}
            <sup>o</sup>C , {weather.description}
          </h1>
          <h4>{weather.location}</h4>
          <p>
            {weather.region} , {weather.country}
          </p>
        </div>

        <div className="col-md-9">
          <img className="mainImg" src={weather.img} alt="weather-img" />
        </div>
      </div>

      <div className="row">
        <div className="col-md-3 weather-info">
          <p>
            <b>Wind Speed</b>(km/hr)
          </p>
          <h2>{weather.wind_speed}</h2>
        </div>

        <div className="col-md-3 weather-info">
          <p>
            <b>Preassure</b>(millibar)
          </p>
          <h2>{weather.pressure}</h2>
        </div>

        <div className="col-md-3 weather-info">
          <p>
            <b>Precipitation</b>(mm)
          </p>
          <h2>{weather.precip}</h2>
        </div>

        <div className="col-md-3 weather-info">
          <p>
            <b>Humidity</b>(%)
          </p>
          <h2>{weather.humidity}</h2>
        </div>
      </div>
    </div>
  );
}

export default DisplayWeather;
