import { yupResolver } from '@hookform/resolvers/yup';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PasswordField from 'Components/Form-Controls/PasswordField';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordChange } from 'Redux/Action/authAction';
import * as yup from 'yup';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
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

export default function ChangePassword(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {alert} = useSelector(state => state);
  const { id } = useParams();

  const schema = yup.object().shape({
    password: yup.string().required('Please enter your password').min(6, 'Please enter least 6 character'),
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
    //   'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character!'
    // ),
    retypePassword: yup
      .string()
      .required('Please retype your password!')
      .oneOf([yup.ref('password')], 'Password does not match!'),
  });

  const form = useForm({
    defaultValues: {
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const data = {...values, id};
    delete data.retypePassword;
    
    await dispatch(resetPasswordChange(data))
  };

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
          <form className={classes.form} noValidate onSubmit={form.handleSubmit(handleSubmit)}>
            <PasswordField name="password" label="Password" form={form} />
            <PasswordField name="retypePassword" label="Retype Password" form={form} />
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