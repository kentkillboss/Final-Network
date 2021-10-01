import React from 'react';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import ImageGrid from 'react-fb-image-grid';
import Photogrid from 'react-facebook-photo-grid';
import Box from '@material-ui/core/Box';
import { useState } from 'react';

PostBody.propTypes = {};

function PostBody({ post }) {
  const [readMore, setReadMore] = useState(false);

  return (
    <>
      <CardContent>
        <Typography variant="body1" component="p">
          {post.content.length < 60
            ? post.content
            : readMore
            ? post.content + ' '
            : post.content.slice(0, 60) + ' ....'}
        </Typography>
        {post.content.length > 60 && (
          <Typography color="textSecondary" variant="subtitle1" onClick={() => setReadMore(!readMore)}>
            {readMore ? 'Hide content' : 'Read more'}
          </Typography>
        )}

        <Photogrid
          images={post.images.map((img) => img.url)} //required
        ></Photogrid>
      </CardContent>
    </>
  );
}

export default PostBody;
