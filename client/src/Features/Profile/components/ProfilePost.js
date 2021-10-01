import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PostThumb from './PostThumb';
import LoadIcon from 'images/load.gif';
import LoadMoreBtn from 'Features/Discover/components/LoadMoreBtn';
import { getDataAPI } from 'api/fetchData';
import { PROFILE_TYPES } from 'Redux/Action/profileAction';

ProfilePost.propTypes = {};

function ProfilePost({ auth, id, dispatch, profile }) {
  const [posts, setPosts] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);
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

  return (
    <div>
      <PostThumb posts={posts} result={result} />
      {load && <img src={LoadIcon} alt="loading" />}

      <LoadMoreBtn result={result} page={page} load={load} handleLoadMore={handleLoadMore} />
    </div>
  );
}

export default ProfilePost;
