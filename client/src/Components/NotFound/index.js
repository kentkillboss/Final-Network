import React from 'react';
import notFound from 'images/notFound.png'

NotFound.propTypes = {};

function NotFound(props) {
  return <div>
    <img style={{position: 'absolute', top: '25%', right: '30%'}} src={notFound} alt='notfound' />
  </div>;
}

export default NotFound;
