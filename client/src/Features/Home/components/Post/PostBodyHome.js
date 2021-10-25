import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
// import ImageGrid from 'react-fb-image-grid';
import PictureGrid from 'Components/GridImages/index';

function PostBodyHome({ post }) {
  return (
    <>
      <CardContent style={{ padding: '0 16px' }}>
        <Box>
          <PictureGrid
            images={post.images.map((image) => image.url)} //required
          ></PictureGrid>
          {/* {post.images.map((img) => (
            <video controls src={img.url} />
          ))} */}
        </Box>
      </CardContent>
    </>
  );
}

export default PostBodyHome;
