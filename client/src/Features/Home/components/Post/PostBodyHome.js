import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
// import ImageGrid from 'react-fb-image-grid';
import Photogrid from 'react-facebook-photo-grid';

function PostBodyHome({ post }) {
  return (
    <>
      <CardContent style={{ padding: '0 16px' }}>
        <Box>
          <Photogrid
            images={post.images.map((image) => image.url)} //required
          ></Photogrid>
          {/* {post.images.map((img) => (
            <video controls src={img.url} />
          ))} */}
        </Box>
      </CardContent>
    </>
  );
}

export default PostBodyHome;
