import React, { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import EditProfileForm from './EditProfileForm/EditProfileForm';
import PrivateBtn from './PrivateBtn';
import EditPasswordForm from './EditPasswordForm/EditPasswordForm';
import { Typography } from '@material-ui/core';

function ProfileSetting(props) {
  const [edit, setEdit] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <SettingsIcon
        style={{ float: 'right', cursor: 'pointer' }}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      />
      <Popover
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList autoFocusItem={open} id="menu-list-grow">
              <MenuItem onClick={() => setEdit(true)} style={{ color: 'black' }}>
                <Typography>Chỉnh sửa</Typography>
              </MenuItem>
              <MenuItem>
                <PrivateBtn />
              </MenuItem>
              <MenuItem onClick={() => setEditPassword(true)} style={{ color: 'black' }}>
                <Typography>Thay đổi Password</Typography>
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popover>
      {edit && <EditProfileForm setEdit={setEdit} />}
      {editPassword && <EditPasswordForm setEditPassword={setEditPassword} />}
    </div>
  );
}

export default ProfileSetting;
