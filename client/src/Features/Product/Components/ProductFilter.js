import React from 'react';
import PropTypes from 'prop-types';
import FilterByCategory from './Filter/FilterByCategory';
import FilterByPrice from './Filter/FilterByPrice';
import { Box } from '@material-ui/core';
import FilterByService from './Filter/FilterByService';

ProductFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function ProductFilter({ filters, onChange }) {
  const handleCategoryChange = (category) => {
    if (!onChange) return;
    const newFilters = {
      ...filters,
      'category.id': category.id,
      'category.name': category.name,
    };
    onChange(newFilters);
  };
  const handleChange = (values) => {
    if (onChange) {
      onChange(values);
    }
  };
  return (
    <Box>
      <FilterByCategory onChange={handleCategoryChange} />
      <FilterByPrice onChange={handleChange} />
      <FilterByService filters={filters} onChange={handleChange} />
    </Box>
  );
}

export default ProductFilter;
