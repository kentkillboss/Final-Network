import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import categoryApi from 'api/categoryApi';
import CategoryLoading from '../CategoryLoading';

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

const useStyles = makeStyles((them) => ({
  root: {
    padding: them.spacing(2),
  },

  menu: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',
    '& > li': {
      marginTop: them.spacing(1),
      '&:hover': {
        color: them.palette.primary.main,
        cursor: 'pointer',
      },
    },
  },
}));

function FilterByCategory({ onChange }) {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        setCategoryList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
        setLoading(false);
      } catch (error) {
        console.log('failed to fetch categorylist', error);
      }
    })();
  }, []);
  const handleCategoryClick = (category) => {
    if (onChange) {
      // onChange(category.id);
      onChange(category);
    }
  };
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">DANH MUC SAN PHAM</Typography>
      {loading ? (
        <CategoryLoading />
      ) : (
        <ul className={classes.menu}>
          {categoryList.map((category) => (
            <li key={category.id} onClick={() => handleCategoryClick(category)}>
              <Typography variant="body2">{category.name}</Typography>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
}

export default FilterByCategory;
