import { yupResolver } from '@hookform/resolvers/yup';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Logo from 'images/logo.png';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';
import InputField from '../../../../Components/Form-Controls/InputField';
import PasswordField from '../../../../Components/Form-Controls/PasswordField';

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
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
    // margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
    width: 80,
    height: 80,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progress: {
    top: theme.spacing(1),
    margin: theme.spacing(8, 4),
  },
  navlink: {
    textDecoration: 'none',
  },
}));

function LoginForm(props) {
  const classes = useStyles();
  const { alert } = useSelector((state) => state);
  const schema = yup.object().shape({
    email: yup.string().required('Please enter your Email!').email('Please enter a valid email address!'),
    password: yup.string().required('Please enter your password'),
  });
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
    // form.reset();
  };

  const { isSubmitting } = form.formState;

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {alert.loading && <LinearProgress />}
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src={Logo}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập vào Dulcie
          </Typography>
          <form className={classes.form} onSubmit={form.handleSubmit(handleSubmit)} noValidate>
            <InputField name="email" label="Email" form={form} />
            <PasswordField name="password" label="Password" form={form} />

            <Button
              disabled={isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Đăng nhập
            </Button>
          </form>
          <Grid container>
            <Grid item xs>
              <NavLink className={classes.navlink} to="/reset-password">
                Quên mật khẩu?
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink className={classes.navlink} to="/register">
                {'Bạn chưa có tài khoản? Đăng ký ngay'}
              </NavLink>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}

export default LoginForm;
