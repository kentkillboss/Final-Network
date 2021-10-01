import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import './editProfile.css';
import InputField from 'Components/Form-Controls/InputField';
import RadioField from 'Components/Form-Controls/RadioField';
import { checkImage } from 'utils/imageUpload';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';
import { Close } from '@material-ui/icons';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { updateProfileUser } from 'Redux/Action/profileAction';
import LinearProgress from '@material-ui/core/LinearProgress';

EditProfileForm.propTypes = {
  user: PropTypes.object,
  setEdit: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  conten: {},
  textfield: {
    marginBottom: theme.spacing(1),
  },
  close: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
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

  const form = useForm({
    defaultValues: {
      fullname: '',
      mobile: '',
      address: '',
      website: '',
      story: '',
      gender: '',
    },
  });

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
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileUser({ userData, avatar, auth }));
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
              <img
                src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
                className="main-profile-img"
                alt="img"
              />
              <span className="icon">
                {/* <Button component="label" className="btnedit"> */}
                <input type="file" name="file" id="file_up" accept="image/*" onChange={handleChangeAvatar} />
                <EditRoundedIcon />
                {/* </Button> */}
              </span>
            </div>

            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Fullname</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                className={classes.textfield}
                label="Fullname"
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
              label="Mobie"
              name="mobile"
              fullWidth
              variant="outlined"
              value={mobile}
              onChange={handleInput}
            />
            <TextField
              className={classes.textfield}
              label="Address"
              name="address"
              fullWidth
              variant="outlined"
              value={address}
              onChange={handleInput}
            />
            <TextField
              className={classes.textfield}
              label="Website"
              name="website"
              fullWidth
              variant="outlined"
              value={website}
              onChange={handleInput}
            />

            <TextField
              className={classes.textfield}
              label="Story"
              name="story"
              fullWidth
              variant="outlined"
              value={story}
              onChange={handleInput}
            />
            <TextField
              className={classes.textfield}
              fullWidth
              select
              label="Gender"
              name="gender"
              id="gender"
              value={gender}
              onChange={handleInput}
              variant="outlined"
            >
              {/* {currencies.map((option) => ( */}
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">FeMale</MenuItem>
              <MenuItem value="other">Other</MenuItem>
              {/* // ))} */}
            </TextField>
            {/* <InputField name="fullname" label="Fullname" form={form} />
            <InputField name="mobile" label="Mobie " form={form} />
            <InputField name="address" label="Address" form={form} />
            <InputField name="website" label="Website" form={form} />
            <InputField name="story" label="Story" form={form} />
            <RadioField name="gender" label="Male" form={form} /> */}
          </DialogContent>
          <DialogActions className={classes.btn}>
            <Button color="primary" mg={1} type="submit" fullWidth variant="contained">
              Subscribe
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default EditProfileForm;
