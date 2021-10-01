import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

ProductThumbnail.propTypes = {
  product: PropTypes.object,
};

function ProductThumbnail({ product }) {
  const thumbnailUrl = product.thumbnail
    ? `https://api.ezfrontend.com${product.thumbnail?.url}`
    : 'https://via.placeholder.com/444';
  return (
    <Box>
      <img src={thumbnailUrl} alt={product.name} width="100%" />
    </Box>
  );
}

export default ProductThumbnail;
