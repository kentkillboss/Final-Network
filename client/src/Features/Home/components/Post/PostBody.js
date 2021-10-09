import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './body.css';
import { Box, CardHeader, IconButton, makeStyles, Typography } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  container: {
    overflow: 'hidden',

  },
  image: {
    maxWidth: '490px',
    maxHeight: '490px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    // backgroundSize: '100%',
    // backgroundRepeat: 'no-repeat'
}
}));

function PostBody({ post, theme }) {
  const classes = useStyles();
  return (
    <Carousel>
      {
        post.images.map((img, index) => (
          <div key={index} className={classes.container}>
              {
                  img.url.match(/video/i)
                  ? <video className={classes.image} controls src={img.url} alt={img.url}
                  style={{filter: theme ? 'invert(1)' : 'invert(0)'}}/>

                  :<img className={classes.image} src={img.url} alt={img.url}
                  style={{filter: theme ? 'invert(1)' : 'invert(0)', }}/>
              }
             
          </div>
      ))
            }
            
    </Carousel>
  );
}

export default PostBody;
