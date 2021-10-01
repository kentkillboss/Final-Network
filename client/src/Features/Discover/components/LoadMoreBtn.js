import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

LoadMoreBtn.propTypes = {};

function LoadMoreBtn({ result, page, load, handleLoadMore }) {
  return (
    <div>
      {result < 3 * (page - 1)
        ? ''
        : !load && (
            <Button onClick={handleLoadMore} variant="outlined" color="primary">
              Load More
            </Button>
          )}
    </div>
  );
}

export default LoadMoreBtn;
