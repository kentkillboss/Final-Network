import React from 'react';
import './loading.css';

function Loader(props) {
  return (
    <div className="backgroundd">
      <div className="wrapper">
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
        <div className="shadow" />
        <div className="shadow" />
        <div className="shadow" />
        <span>Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
