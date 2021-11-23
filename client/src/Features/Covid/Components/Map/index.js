import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import Chart from './Chart';
import HighMap from './HighMap';

function MapVn({ data, selectedCountry }) {
  const [mapData, setMapData] = useState([]);
  useEffect(() => {
    if (selectedCountry) {
      import(`@highcharts/map-collection/countries/${selectedCountry}/${selectedCountry}-all.geo.json`).then((res) =>
        setMapData(res)
      );
    }
  }, [selectedCountry]);
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          <Chart data={data} />
        </Grid>
        <Grid item sm={4} xs={12}>
          <HighMap mapData={mapData} />
        </Grid>
      </Grid>
    </div>
  );
}

export default MapVn;
