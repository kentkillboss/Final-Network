import React from 'react';
import { useSelector } from 'react-redux';

const Avatar = ({ src, size }) => {
  const { theme } = useSelector((state) => state);

  return <img src={src} alt="avatar" className={size} />;
};

export default Avatar;
