import React from 'react';
import PropTypes from 'prop-types';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';

LikeButton.propTypes = {};

function LikeButton({ isLike, handleLike, handleUnLike }) {
  return (
    <>
      {isLike ? (
        <FavoriteRoundedIcon color="error" onClick={handleUnLike} />
      ) : (
        <FavoriteBorderRoundedIcon onClick={handleLike} />
      )}
    </>
  );
}

export default LikeButton;
