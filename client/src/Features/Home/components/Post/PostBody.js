import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
// import ImageGrid from 'react-fb-image-grid';
import Photogrid from 'react-facebook-photo-grid';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

function PostBody({ post }) {
  const [images, setImages] = useState(null);

  useEffect(() => {
    setImages(
    post.images.map((img) => ({
      original: `${img.url}`,
      thumbnail: `${img.url}`,
    })));
  }, [post.images]);

  return (
    <Box>
    {images ? <ImageGallery  items={images} /> : null}
    </Box>
  );
}

export default PostBody;
