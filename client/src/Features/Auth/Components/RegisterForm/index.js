import { yupResolver } from '@hookform/resolvers/yup';
import { LinearProgress } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Alert from 'Components/Alert/alert';
import RadioField from 'Components/Form-Controls/RadioField';
import Logo from 'images/logo.png';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';
import InputField from '../../../../Components/Form-Controls/InputField';
import PasswordField from '../../../../Components/Form-Controls/PasswordField';

RegisterForm.propTypes = {
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

function RegisterForm(props) {
  const classes = useStyles();
  const { alert } = useSelector((state) => state);
  const schema = yup.object().shape({
    // title: yup.string().required('Please enter title'),
    fullname: yup
      .string()
      .required('Vui lòng nhập họ và tên!')
      .test('should two word', 'Vui lòng nhập ít nhất 2 ký chữ cái!', (value) => {
        return value.split(' ').length >= 2;
      }),
    username: yup.string().required('Vui lòng nhập biệt danh!'),
    email: yup.string().required('Vui lòng nhập Email!').email('Vui lòng nhập đúng định dạng email!'),
    password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Vui lòng nhập ít nhất 6 ký tự'),
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
    //   'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character!'
    // ),
    retypePassword: yup
      .string()
      .required('vui lòng nhập lại mật khẩu!')
      .oneOf([yup.ref('password')], 'Mật khẩu không trùng!'),
  });
  const form = useForm({
    defaultValues: {
      fullname: '',
      username: '',
      email: '',
      password: '',
      retypePassword: '',
      gender: 'nam',
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
        <Alert />
        {/* {isSubmitting && <LinearProgress className={classes.progress} />} */}
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src={Logo}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng ký tài khoản Dulcie
          </Typography>
          <form className={classes.form} onSubmit={form.handleSubmit(handleSubmit)} noValidate>
            <InputField name="fullname" label="Họ và tên" form={form} />
            <InputField name="username" label="Biệt danh" form={form} />
            <InputField name="email" label="Email" form={form} />
            <PasswordField name="password" label="Mật khẩu" form={form} />
            <PasswordField name="retypePassword" label="Nhập lại mật khẩu" form={form} />
            <RadioField name="gender" label="Male" form={form} />

            <Button
              disabled={isSubmitting || alert.loading}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Đăng ký
            </Button>
            <Grid container>
              <Grid xs></Grid>
              <Grid item>
                <NavLink className={classes.navlink} to="/login">
                  {'Bạn đã có tài khoản? Đăng nhập ngay'}
                </NavLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default RegisterForm;
