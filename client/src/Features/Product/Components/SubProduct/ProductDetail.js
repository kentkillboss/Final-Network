import React from 'react';
import PropTypes from 'prop-types';

ProductDetail.propTypes = {};

function ProductDetail({ product = {} }) {
  return <div>{product.description}</div>;
}

export default ProductDetail;
