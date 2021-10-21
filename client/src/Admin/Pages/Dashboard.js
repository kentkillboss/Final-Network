import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from 'Redux/Action/adminAction';

function Dashboard(props) {
    const {auth, admin} = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers(auth));
    }, [auth, dispatch])

    return (
        <div>
            <p>số lượng người dùng của Dulcie {admin.result} </p>
        </div>
    );
}

export default Dashboard;