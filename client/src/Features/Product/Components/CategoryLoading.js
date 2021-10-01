import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

CategoryLoading.propTypes = {
  length: PropTypes.number,
};
CategoryLoading.defaultProps = {
  length: 12,
};

const useStyles = makeStyles((them) => ({
  root: {},
  skeleton: {
    justifyContent: 'center',
  },
}));

function CategoryLoading({ length }) {
  const classes = useStyles();
  return (
    <Box>
      <Grid container>
        <Skeleton className={classes.skeleton} width={'90%'} />
      </Grid>
    </Box>
  );
}

export default CategoryLoading;
