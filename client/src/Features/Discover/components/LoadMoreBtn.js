import { Button } from '@material-ui/core';
import React from 'react';

LoadMoreBtn.propTypes = {};

function LoadMoreBtn({ result, page, load, handleLoadMore }) {
  return (
    <div>
      {result < 9 * (page - 1)
        ? ''
        : !load && (
            <Button style={{ marginTop: '10px' }} onClick={handleLoadMore} variant="outlined" color="primary">
              Load More
            </Button>
          )}
    </div>
  );
}

export default LoadMoreBtn;
