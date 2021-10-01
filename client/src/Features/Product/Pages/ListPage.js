import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import productApi from 'api/productApi';
import ProductLoading from '../Components/ProductLoading';
import ProductList from '../Components/ProductList';
import { Pagination } from '@material-ui/lab';
import ProductSort from '../Components/ProductSort';
import ProductFilter from '../Components/ProductFilter';
import FilterViewer from '../Components/Filter/FilterViewer';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';

ListPage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '250px',
  },
  right: {
    flex: '1 1 0',
  },
  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    marginTop: '20px',
    paddingBottom: '10px',
  },
}));

function ListPage(props) {
  const classes = useStyles();
  const [productList, setproductList] = useState();
  const [loading, setLoading] = useState(true);
  //filter mới sử dụng queryString
  const history = useHistory();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 12,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);
  const [pagination, setPagination] = useState({
    limit: 12,
    total: 10,
    page: 1,
  });
  // Filter cũ
  // const [filter, setFilter] = useState({
  //   _page: 1,
  //   _limit: 12,
  //   _sort: 'salePrice:ASC',
  // });
  // const [filter, setFilter] = useState(() => ({
  //   ...queryParams,
  //   _page: Number.parseInt(queryParams._page) || 1,
  //   _limit: Number.parseInt(queryParams._limit) || 12,
  //   _sort: queryParams._sort || 'salePrice:ASC',
  // }));
  // useEffect(() => {
  //   history.push({
  //     pathname: history.location.pathname,
  //     search: queryString.stringify(filter),
  //   });
  // }, [history, filter]);
  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setproductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Fail fetch products');
      }
      setLoading(false);
    })();
  }, [queryParams]);
  const handleSortChange = (newSortValue) => {
    // setFilter((prevFilter) => ({
    //   ...prevFilter,
    //   _sort: newSortValue,
    // }));
    const filters = {
      ...queryParams,
      _sort: newSortValue,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const handlePageChange = (e, page) => {
    // setFilter((prevFilter) => ({
    //   ...prevFilter,
    //   _page: page,
    // }));
    const filters = {
      ...queryParams,
      _page: page,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const handleFilterChange = (newFilter) => {
    // setFilter((prevFilter) => ({
    //   ...prevFilter,
    //   ...newFilter,
    // }));
    const filters = {
      ...queryParams,
      ...newFilter,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const setNewFilter = (newFilter) => {
    // setFilter(newFilter);
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilter),
    });
  };
  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilter filters={queryParams} onChange={handleFilterChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
              <FilterViewer filters={queryParams} onChange={setNewFilter} />
              {loading ? <ProductLoading /> : <ProductList data={productList} />}
              <Box className={classes.pagination}>
                <Pagination
                  color="primary"
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePageChange}
                ></Pagination>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
