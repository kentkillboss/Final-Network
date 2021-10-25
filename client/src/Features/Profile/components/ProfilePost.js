import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PostThumb from './PostThumb';
import LoadIcon from 'images/load.gif';
import LoadMoreBtn from 'Features/Discover/components/LoadMoreBtn';
import { getDataAPI } from 'api/fetchData';
import { PROFILE_TYPES } from 'Redux/Action/profileAction';
import { Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router-dom';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} className={classes.post}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  post: {
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
}));

function ProfilePost({ auth, id, dispatch, profile }) {
  const [posts, setPosts] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);

  const [savePosts, setSavePosts] = useState([]);
  const [resultSave, setResultSave] = useState(9);
  const [pageSave, setPageSave] = useState(2);
  const [loadSave, setLoadSave] = useState(false);
  const params = useParams();
  useEffect(() => {
    profile.userPosts.forEach((data) => {
      if (data._id === id) {
        setPosts(data.posts);
        setResult(data.result);
        setPage(data.page);
      }
    });
  }, [profile.userPosts, id]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`user_posts/${id}?limit=${page * 9}`, auth.token);
    const newData = { ...res.data, page: page + 1, _id: id };
    dispatch({ type: PROFILE_TYPES.UPDATE_POST, payload: newData });
    setLoad(false);
  };

  useEffect(() => {
    setLoadSave(true);

    getDataAPI('getSavePosts', auth.token)
      .then((res) => {
        setSavePosts(res.data.savePosts);
        setResultSave(res.data.result);
        setLoadSave(false);
      })
      .catch((err) => {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
      });

    return () => setSavePosts([]);
  }, [auth.token, dispatch]);

  const handleLoadMoreSave = async () => {
    setLoadSave(true);
    const res = await getDataAPI(`getSavePosts?limit=${page * 9}`, auth.token);
    setSavePosts(res.data.savePosts);
    setResultSave(res.data.result);
    setPageSave(page + 1);
    setLoadSave(false);
  };
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root} style={{backgroundColor: theme ? '#e7e6e5' : '#f0f2f5'}}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Bài đăng" {...a11yProps(0)} />
          <Tab label="Đã lưu" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <div>
          <Grid container>
            {posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Link to={`/post/${post._id}`}>
                  <PostThumb posts={post} result={result} />
                </Link>
              </Grid>
            ))}
          </Grid>
          {load && <img src={LoadIcon} alt="loading" />}

          <LoadMoreBtn result={result} page={page} load={load} handleLoadMore={handleLoadMore} />
        </div>
      </TabPanel>
      {auth.user._id === params.id && (
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div>
            <Grid container>
              {savePosts.map((postSave) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Link to={`/post/${postSave._id}`}>
                    <PostThumb posts={postSave} result={resultSave} />
                  </Link>
                </Grid>
              ))}
            </Grid>
            {loadSave && <img src={LoadIcon} alt="loading1" />}

            <LoadMoreBtn result={resultSave} page={pageSave} load={loadSave} handleLoadMore={handleLoadMoreSave} />
          </div>
        </TabPanel>
      )}
    </div>
  );
}

export default ProfilePost;
