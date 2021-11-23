import { FormControl, InputLabel, NativeSelect } from '@material-ui/core';
import React from 'react';

function CountrySelect({ selectedCountry, handleSelect, country }) {
  return (
    <div style={{ marginLeft: '15px', paddingTop: '10px' }}>
      <FormControl>
        <InputLabel htmlFor="" shrink>
          {' '}
          Quốc gia
        </InputLabel>
        <NativeSelect
          value={selectedCountry}
          onChange={handleSelect}
          inputProps={{
            name: 'country',
            id: 'country-selector',
          }}
        >
          {country.map((item) => {
            return (
              <option key={country.ISO2} value={item.ISO2.toLowerCase()}>
                {item.Country}
              </option>
            );
          })}
        </NativeSelect>
      </FormControl>
    </div>
  );
}

export default CountrySelect;
