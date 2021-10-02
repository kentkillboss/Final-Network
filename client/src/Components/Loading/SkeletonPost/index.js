import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

PostLoading.propTypes = {};

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: '100%',
  },
  media: {
    height: 190,
  },
}));

function PostLoading(props) {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.card} style={{ margin: '0', marginBottom: '25px' }}>
        <CardHeader
          avatar={<Skeleton animation="wave" variant="circle" width={40} height={40} />}
          title={<Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6 }} />}
          subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />
        <Skeleton animation="wave" variant="rect" className={classes.media} />

        <CardContent>
          <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="100%" />
          </React.Fragment>
        </CardContent>
      </Card>
    </div>
  );
}

export default PostLoading;
