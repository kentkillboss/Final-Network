import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  MenuItem,
  TextField,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Close } from '@material-ui/icons';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';
import { updateProfileUser } from 'Redux/Action/profileAction';
import { checkImage } from 'utils/imageUpload';
import './editProfile.css';

EditProfileForm.propTypes = {
  user: PropTypes.object,
  setEdit: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  textfield: {
    marginBottom: theme.spacing(1),
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  btn: {
    margin: '0 15px',
  },
  text: {
    color: 'grey',
  },
}));

function EditProfileForm({ setEdit }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const inititalState = {
    fullname: '',
    mobile: '',
    address: '',
    website: '',
    story: '',
    gender: '',
  };
  const [userData, setUserData] = useState(inititalState);
  const { fullname, mobile, address, website, story, gender } = userData;
  const [avatar, setAvatar] = useState('');
  const [background, setBackground] = useState('');

  const { auth, alert } = useSelector((state) => state);

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  const handleClose = () => {
    setEdit(false);
  };
  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    const err = checkImage(file);
    if (err)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err },
      });
    setAvatar(file);
  };
  const handleChangeBackG = (e) => {
    const file = e.target.files[0];
    const err = checkImage(file);
    if (err)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err },
      });
    setBackground(file);
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileUser({ userData, avatar, background, auth }));
  };

  return (
    <div>
      <Dialog open={setEdit}>
        {alert.loading && <LinearProgress />}
        <IconButton onClick={handleClose} className={classes.close}>
          <Close />
        </IconButton>
        <form onSubmit={handleSubmit}>
          <DialogContent className={classes.conten}>
            <div className="user">
              <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt="img" />
              <span className="icon">
                <input
                  type="file"
                  name="file"
                  id="file_up"
                  accept="image/*"
                  onChange={handleChangeAvatar}
                  style={{ display: 'none' }}
                />
                <label htmlFor="file_up">
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>
                {/* </Button> */}
              </span>
            </div>
            <div className="background">
              <img src={background ? URL.createObjectURL(background) : auth.user.background} alt="" />
              <span className="icon-background">
                <input
                  type="file"
                  name="file"
                  id="file_up1"
                  accept="image/*"
                  onChange={handleChangeBackG}
                  style={{ display: 'none' }}
                />
                <label htmlFor="file_up1">
                  <IconButton color="inherit" aria-label="upload picture" component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>
              </span>
            </div>

            <FormControl fullWidth margin="normal" variant="outlined" style={{ marginTop: '30px', marginBottom: 0 }}>
              <InputLabel htmlFor="outlined-adornment-password">Họ và tên</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                className={classes.textfield}
                label="Họ và tên"
                name="fullname"
                fullWidth
                variant="outlined"
                value={fullname}
                onChange={handleInput}
                endAdornment={
                  <InputAdornment className={classes.text} position="end">
                    {fullname.length}/25
                  </InputAdornment>
                }
              />
            </FormControl>

            <TextField
              className={classes.textfield}
              label="Số điện thoại"
              name="mobile"
              fullWidth
              variant="outlined"
              value={mobile}
              onChange={handleInput}
            />
            <TextField
              className={classes.textfield}
              label="Địa chỉ"
              name="address"
              fullWidth
              variant="outlined"
              value={address}
              onChange={handleInput}
            />
            <TextField
              className={classes.textfield}
              label="Trang web"
              name="website"
              fullWidth
              variant="outlined"
              value={website}
              onChange={handleInput}
            />

            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Giới thiệu</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                className={classes.textfield}
                multiline
                rows={3}
                maxRows={10}
                label="Giới thiệu"
                name="story"
                fullWidth
                variant="outlined"
                value={story}
                onChange={handleInput}
                endAdornment={
                  <InputAdornment className={classes.text} position="end">
                    {story.length}/200
                  </InputAdornment>
                }
              />
            </FormControl>
            <TextField
              className={classes.textfield}
              fullWidth
              select
              label="Giới tính"
              name="gender"
              id="gender"
              value={gender}
              onChange={handleInput}
              variant="outlined"
            >
              <MenuItem value="nam">Nam</MenuItem>
              <MenuItem value="nữ">Nữ</MenuItem>
              <MenuItem value="khác">Khác</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions className={classes.btn}>
            <Button disabled={alert.loading} color="primary" mg={1} type="submit" fullWidth variant="contained">
              Lưu thay đổi
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default EditProfileForm;
