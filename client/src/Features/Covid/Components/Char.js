import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React from 'react';

function Char({ data }) {
  const dataLastDay = data && data.length ? data[data.length - 1] : [];

  const arr = [
    {
      title: 'Số ca nhiễm',
      count: dataLastDay.Confirmed,
      type: 'confirmed',
    },
    {
      title: 'Số ca khỏi',
      count: dataLastDay.Recovered,
      type: 'recovered',
    },
    {
      title: 'Số ca tử vong',
      count: dataLastDay.Deaths,
      type: 'deaths',
    },
  ];

  return (
    <div>
      <Grid container>
        {arr.map((item, index) => (
          <Grid item sm={4} xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="h5">{item.count}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Char;
