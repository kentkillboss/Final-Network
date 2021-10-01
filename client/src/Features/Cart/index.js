import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import CartInfo from './cartInfo';
// import CartTotal from './CartTotal';
import { useSelector } from 'react-redux';
import { cartItemCountSelector } from './selectors';

CartFeature.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },

  gridContainer: {
    display: 'flex',
    flexFlow: 'column nowrap',
  },

  cartProductTitle: {
    color: 'rgb(51, 51, 51)',
    fontSize: '18px',
    fontWeight: 500,
    margin: '0 0 12px',
  },

  cartProductCount: {
    fontSize: '14px',
    fontWeight: 400,
    marginLeft: '4px',
  },

  left: {
    backgroundColor: 'rgb(239, 239, 239)',
    marginRight: theme.spacing(2),
  },

  right: {
    backgroundColor: 'rgb(239, 239, 239)',
    flex: '1 1 0',
  },
}));

function CartFeature(props) {
  const classes = useStyles();
  const cartItemsCount = useSelector(cartItemCountSelector);
  return (
    <Box className={classes.root}>
      <Container>
        <Grid container className={classes.gridContainer}>
          <Box component="h2" className={classes.cartProductTitle}>
            GIỎ HÀNG
            <Box component="span" className={classes.cartProductCount}>
              ({cartItemsCount} sản phẩm)
            </Box>
          </Box>
          <Box style={{ display: 'flex' }}>
            <Grid item className={classes.left} lg={9}>
              <CartInfo />
            </Grid>
            <Grid item className={classes.right}>
              {/* <CartTotal /> */}
            </Grid>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

export default CartFeature;
