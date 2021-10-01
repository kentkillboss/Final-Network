import { Box, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import Header from 'Components/Header';
import { addToCart } from 'Features/Cart/cartSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router';
import AddToCartForm from '../Components/AddToCartForm';
import ProductInfo from '../Components/ProductInfo';
import ProductMenu from '../Components/ProductMenu';
import ProductThumbnail from '../Components/ProductThumbnail';
import ProductAdditional from '../Components/SubProduct/ProductAdditional';
import ProductDetail from '../Components/SubProduct/ProductDetail';
import ProductReview from '../Components/SubProduct/ProductReview';
import useProductDetail from '../Hooks/useProductDetail';
const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
  },
  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
  },
}));
function DetailPage() {
  const classes = useStyles();
  const {
    params: { productId },
    url,
  } = useRouteMatch();

  const { product, loading } = useProductDetail(productId);
  const dispatch = useDispatch();
  if (loading) {
    return (
      <Box className={classes.loading}>
        <LinearProgress />
      </Box>
    );
  }
  const handleAddToCartSubmit = ({ quantity }) => {
    // console.log(formValues);
    const action = addToCart({
      id: product.id,
      product,
      quantity,
    });
    console.log(action);
    dispatch(action);
  };
  return (
    <Box>
      <Header />
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>

        <ProductMenu />
        <Switch>
          <Route exact path={url}>
            <ProductDetail product={product} />
          </Route>

          <Route path={`${url}/additional`} component={ProductAdditional} />
          <Route path={`${url}/reviews`} component={ProductReview} />
        </Switch>
      </Container>
    </Box>
  );
}

export default DetailPage;
