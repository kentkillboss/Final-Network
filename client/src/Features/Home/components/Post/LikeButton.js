import React from 'react';
import PropTypes from 'prop-types';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';

LikeButton.propTypes = {};

function LikeButton({ isLike, handleLike, handleUnLike }) {
  return (
    <>
      {isLike ? (
        <FavoriteRoundedIcon style={{ cursor: 'pointer' }} color="error" onClick={handleUnLike} />
      ) : (
        <FavoriteBorderRoundedIcon style={{ cursor: 'pointer' }} onClick={handleLike} />
      )}
    </>
  );
}

export default LikeButton;
