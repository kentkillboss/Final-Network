import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from 'Redux/Action/authAction';
import { LinearProgress } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import Logo from 'images/logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [values, setValues] = useState({email: ''});
  const { email } = values;
  const dispatch = useDispatch();
  const { alert } = useSelector((state) => state);

  const handleChangeValue = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value})
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(resetPassword(values));
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {alert.loading && <LinearProgress />}
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src={Logo}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Thay đổi mật khẩu
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              onChange={handleChangeValue}
              value={email}
              label="Email Address"
              autoComplete="email"
              autoFocus
            />
            <Typography>Đừng bao giờ chia sẻ email với bất cứ ai</Typography>
            <Button
              disabled={alert.loading}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
            <Grid container>
              <Grid xs></Grid>
              <Grid item>
                <NavLink className={classes.navlink} to="/login">
                  {'Already have an account? Log In'}
                </NavLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}