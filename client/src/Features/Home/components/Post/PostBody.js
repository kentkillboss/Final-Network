import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const useStyles = makeStyles((theme) => ({
  container: {
    overflow: 'hidden',
    // maxWidth: '490px',
  },
  image: {
    width: 'auto',
    maxHeight: 'calc(100vh - 115px)',
    minHeight: 'calc(100vh - 115px)', 
    maxWidth: '100%',
    minWidth: '100%', 
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    objectFit: 'contain',
    // backgroundSize: '100%',
    // backgroundRepeat: 'no-repeat'
    [theme.breakpoints.down('sm')]: {
      maxHeight: 'calc(100vh - 500px)',
    minHeight: 'calc(100vh - 500px)', 
    },
  },
}));

function PostBody({ post }) {
  const {theme} = useSelector(state => state);
  
  const classes = useStyles();
  return (
    <Carousel showThumbs={false}>
      {post.images.map((img, index) => (
        <div key={index} className={classes.container}>
          {img.url.match(/video/i) ? (
            <video
              className={classes.image}
              controls
              src={img.url}
              alt={img.url}
              style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
            />
          ) : (
            <img
              className={classes.image}
              src={img.url}
              alt={img.url}
              style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
            />
          )}
        </div>
      ))}
    </Carousel>
  );
}

export default PostBody;
