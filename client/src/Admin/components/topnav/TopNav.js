import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'Redux/Action/authAction';
import './topnav.css';


const Topnav = () => {
    const {auth} = useSelector(state => state);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className='topnav'>
            <div className="topnav__search">
                
            </div>
            <div className="topnav__right">
                <div className="topnav__right-item">
                    {/* dropdown here */}

                    <div className="topnav__right-user" style={{cursor: 'pointer'}} onClick={handleClick}>
                        <div className="topnav__right-user__image">
                            <img src={auth.user.avatar} alt="" />
                        </div>
                        <div className="topnav__right-user__name">
                            {auth.user.username}
                        </div>

                    </div>
                    <Menu
                        style={{marginTop: '50px'}}
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    )
}

export default Topnav
