import React from 'react';

function SearchCountry({ changeWeather, changeLocation }) {
  return (
    <div>
      <form onSubmit={(e) => changeLocation(e)}>
        <input placeholder="Nhap thanh pho" onChange={(e) => changeWeather(e.target.value)} />
      </form>
    </div>
  );
}

export default SearchCountry;
