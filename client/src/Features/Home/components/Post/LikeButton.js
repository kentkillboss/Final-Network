import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import React from 'react';

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
