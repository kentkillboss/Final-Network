import React from 'react'
import './topnav.css';
import { Link } from 'react-router-dom'
import Dropdown from '../dropdown/Dropdown'
import notifications from 'Admin/assets/JsonData/notification.json'
import user_image from 'Admin/assets/images/tuat.png'
import user_menu from 'Admin/assets/JsonData/user_menus.json'
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { logout } from 'Redux/Action/authAction';

const curr_user = {
    display_name: 'Tuat Tran',
    image: user_image
}

const renderNotificationItem = (item, index) => (
    <div className="notification-item" key={index}>
        <i className={item.icon}></i>
        <span>{item.content}</span>
    </div>
)

const renderUserToggle = (user) => (
    <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            <img src={user.image} alt="" />
        </div>
        <div className="topnav__right-user__name">
            {user.display_name}
        </div>
    </div>
)

const renderUserMenu =(item, index) => (
    <Link to='/' key={index}>
        <div className="notification-item">
            <i className={item.icon}></i>
            <span>{item.content}</span>
        </div>
    </Link>
)

const Topnav = () => {
    const {auth, posts} = useSelector(state => state);
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
                <input type="text" placeholder='Search here...' />
                <i className='bx bx-search'></i>
            </div>
            <div className="topnav__right">
                <div className="topnav__right-item">
                    {/* dropdown here */}

                    <div className="topnav__right-user" onClick={handleClick}>
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
