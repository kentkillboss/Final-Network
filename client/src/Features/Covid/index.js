import { getCountry, getDataByCountry } from 'api/fetchData';
import React, { useEffect, useState } from 'react';
import Char from './Components/Char';
import CountrySelect from './Components/CountrySelect';
import MapVn from './Components/Map/index';
import { sortBy } from 'lodash';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');

function Covid(props) {
  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    getCountry().then((res) => {
      const { data } = res;
      const countries = sortBy(data, 'Country');
      setCountry(countries);
      setSelectedCountry('vn');
    });
  }, []);

  const handleSelect = (e) => {
    setSelectedCountry(e.target.value);
  };

  useEffect(() => {
    if (selectedCountry) {
      const { Slug } = country.find((item) => item.ISO2.toLowerCase() === selectedCountry);
      getDataByCountry(Slug).then((res) => {
        res.data.pop();
        setData(res.data);
      });
    }
  }, [country, selectedCountry]);
  return (
    <div>
      <Typography variant="h3" style={{ marginLeft: '10px' }}>
        Thông tin Covid 19
      </Typography>
      <Typography style={{ marginLeft: '15px' }}>{moment().format('LLL')}</Typography>
      <CountrySelect country={country} handleSelect={handleSelect} selectedCountry={selectedCountry} />
      <Char data={data} />
      <MapVn data={data} selectedCountry={selectedCountry} />
    </div>
  );
}

export default Covid;
