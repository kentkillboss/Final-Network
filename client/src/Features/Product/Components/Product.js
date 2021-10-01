import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { formatPrice } from 'utils';
Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product }) {
  const history = useHistory();
  const thumbnailUrl = product.thumbnail
    ? `https://api.ezfrontend.com${product.thumbnail?.url}`
    : 'https://via.placeholder.com/444';
  const handleClick = () => {
    history.push(`/products/${product.id}`);
  };
  return (
    <Box padding={1} onClick={handleClick}>
      <Box padding={1}>
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box>
      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
          {formatPrice(product.salePrice)}
        </Box>

        {product.promotionPercent > 0 ? `  -${product.promotionPercent}%` : ''}
      </Typography>
    </Box>
  );
}

export default Product;
