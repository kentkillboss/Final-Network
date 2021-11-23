import {
  Button,
  FormControl,
  IconButton, makeStyles, TextField,
  Typography
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';
import { ChangePassword } from 'Redux/Action/profileAction';
import * as yup from 'yup';
import '../EditProfileForm/editProfile.css';

EditPasswordForm.propTypes = {
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
  title: {
    position: 'absolute',
    left: '23%',
    top: theme.spacing(2),
  },
}));

function EditPasswordForm({ setEditPassword }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const inititalState = {
    oldPassword: '',
    newPassword: '',
    rtPassword: '',
  };
  const [data, setData] = useState(inititalState);
  const { oldPassword, newPassword, rtPassword } = data;

  const { auth, alert } = useSelector((state) => state);

  const schema = yup.object().shape({
    oldPassword: yup.string().required('Please enter your old password').min(6, 'Please enter least 6 character'),
    newPassword: yup.string().required('Please enter your new password').min(6, 'Please enter least 6 character'),
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
    //   'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character!'
    // ),
    rtPassword: yup
      .string()
      .required('Please retype your password!')
      .oneOf([yup.ref('newPassword')], 'Retype password does not match!'),
  });

  const handleClose = () => {
    setEditPassword(false);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schema.validate(data, { abortEarly: false });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.errors,
        },
      });
      return;
    }
    dispatch(ChangePassword({ data, auth }));
  };

  return (
    <div>
      <Dialog open={setEditPassword}>
        {alert.loading && <LinearProgress />}
        <Typography className={classes.title}>
          <b> Change Password </b>
        </Typography>
        <IconButton onClick={handleClose} className={classes.close}>
          <Close />
        </IconButton>
        <form onSubmit={handleSubmit}>
          <DialogContent className={classes.conten}>
            <FormControl fullWidth margin="normal" variant="outlined" style={{ marginTop: '30px', marginBottom: 0 }}>
              <TextField
                className={classes.textfield}
                name="oldPassword"
                label="Old Password"
                type="password"
                variant="outlined"
                onChange={handleInput}
                value={oldPassword}
              />
              <TextField
                className={classes.textfield}
                name="newPassword"
                label="New Password"
                type="password"
                variant="outlined"
                onChange={handleInput}
                value={newPassword}
              />
              <TextField
                className={classes.textfield}
                name="rtPassword"
                label="Retype Password"
                type="password"
                variant="outlined"
                onChange={handleInput}
                value={rtPassword}
              />
            </FormControl>
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

export default EditPasswordForm;
