import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Checkbox, FormControlLabel, makeStyles, TextField, Typography } from '@material-ui/core';

FilterByService.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};
const useStyles = makeStyles((them) => ({
  root: {
    padding: them.spacing(2),
    borderTop: `1px solid ${them.palette.grey[300]}`,
  },
  range: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginTop: them.spacing(1),
    marginBottom: them.spacing(1),
    '& > span': {
      marginLeft: them.spacing(1),
      marginRight: them.spacing(1),
    },
  },
  checkbox: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',
    '& > li': {
      margin: 0,
    },
  },
}));

function FilterByService({ filters = {}, onChange }) {
  const classes = useStyles();
  const handleChange = (e) => {
    if (!onChange) return;
    const { name, checked } = e.target;
    onChange({ [name]: checked });
  };
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">Dich vu</Typography>
      <ul className={classes.checkbox}>
        {[
          { value: 'isPromotion', label: 'Khuyen Mai' },
          { value: 'isFreeShip', label: 'FreeShip' },
        ].map((service) => (
          <li key={service.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filters[service.value])}
                  onChange={handleChange}
                  name={service.value}
                  color="primary"
                />
              }
              label={service.label}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByService;
