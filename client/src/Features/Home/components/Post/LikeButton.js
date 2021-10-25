import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import React from 'react';

LikeButton.propTypes = {};

function LikeButton({ isLike, handleLike, handleUnLike, theme }) {
  return (
    <>
      {isLike ? (
        <FavoriteRoundedIcon style={{ cursor: 'pointer', filter: theme ? 'invert(1)' : 'invert(0)' }} color="error" onClick={handleUnLike} />
      ) : (
        <FavoriteBorderRoundedIcon style={{ cursor: 'pointer' }} onClick={handleLike} />
      )}
    </>
  );
}

export default LikeButton;
