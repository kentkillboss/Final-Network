import { makeStyles, TextField } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '40%',
    margin: '0 auto',
    textAlign: 'center',
    position: 'absolute',
    top: '10%',
    left: '30%',
    backgroundColor: 'rgb(0 0 0 / 50%)',
    borderRadius: '5px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      top: '10%',
      left: 0,
    },
  },
  multilineColor: {
    color: 'white',
  },
}));

function SearchCountry({ changeWeather, changeLocation }) {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <form onSubmit={(e) => changeLocation(e)}>
        <TextField
          InputProps={{
            className: classes.multilineColor,
          }}
          fullWidth
          variant="outlined"
          placeholder="Enter Thành Phố Để Tìm Kiếm"
          onChange={(e) => changeWeather(e.target.value)}
        />
      </form>
    </div>
  );
}

export default SearchCountry;
