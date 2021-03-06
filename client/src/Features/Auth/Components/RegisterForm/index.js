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
      .required('Vui l??ng nh???p h??? v?? t??n!')
      .test('should two word', 'Vui l??ng nh???p ??t nh???t 2 k?? ch??? c??i!', (value) => {
        return value.split(' ').length >= 2;
      }),
    username: yup.string().required('Vui l??ng nh???p bi???t danh!'),
    email: yup.string().required('Vui l??ng nh???p Email!').email('Vui l??ng nh???p ????ng ?????nh d???ng email!'),
    password: yup.string().required('Vui l??ng nh???p m???t kh???u').min(6, 'Vui l??ng nh???p ??t nh???t 6 k?? t???'),
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
    //   'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character!'
    // ),
    retypePassword: yup
      .string()
      .required('vui l??ng nh???p l???i m???t kh???u!')
      .oneOf([yup.ref('password')], 'M???t kh???u kh??ng tr??ng!'),
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
            ????ng k?? t??i kho???n Dulcie
          </Typography>
          <form className={classes.form} onSubmit={form.handleSubmit(handleSubmit)} noValidate>
            <InputField name="fullname" label="H??? v?? t??n" form={form} />
            <InputField name="username" label="Bi???t danh" form={form} />
            <InputField name="email" label="Email" form={form} />
            <PasswordField name="password" label="M???t kh???u" form={form} />
            <PasswordField name="retypePassword" label="Nh???p l???i m???t kh???u" form={form} />
            <RadioField name="gender" label="Male" form={form} />

            <Button
              disabled={isSubmitting || alert.loading}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              ????ng k??
            </Button>
            <Grid container>
              <Grid xs></Grid>
              <Grid item>
                <NavLink className={classes.navlink} to="/login">
                  {'B???n ???? c?? t??i kho???n? ????ng nh???p ngay'}
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
