import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { activatedUser } from 'Redux/Action/authAction';

function Activate(props) {
    const dispatch = useDispatch();
    const {id} = useParams();
    useEffect(() => {
        dispatch(activatedUser(id));
    }, [dispatch, id])
    return (
        <div style={{alignContent: 'center', textAlign: 'center'}}>
            active success
            <Link to='/login'>login</Link>
        </div>
    );
}

export default Activate;