import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { activatedUser } from 'Redux/Action/authAction';
import { Box, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  bg1: {
    backgroundColor: '#FFA73B',
    height: '300px',
  },
  bg2: {
    width: '100%',
  },
  card: {
    width: '40%',
    height: '75%',
    margin: '0 auto',
    textAlign: 'center',
    position: 'absolute',
    top: '20%',
    left: '30%',
    backgroundColor: '#F4F4F4',
    borderRadius: '5px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      top: 56,
      left: 0,
      height: '100%',
    },
  },
  btn: {
    marginTop: 35,
  },
  typo: {
    fontFamily: 'inherit',
    marginTop: 25,
    fontSize: 18,
    textAlign: 'left',
    paddingLeft: 20,
    paddingRight: 20,
    color: '#666666',
  },
  img: {
    marginTop: 15,
  },
}));

function Activate(props) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(activatedUser(id));
  }, [dispatch, id]);
  return (
    <div>
      <Box>
        <Box className={classes.bg1}></Box>
        <Box className={classes.bg2}>
          <Box className={classes.card}>
            <Typography variant="h2">Welcome!</Typography>
            <img className={classes.img} src="https://img.icons8.com/clouds/100/000000/handshake.png" alt="" />
            <Typography className={classes.typo}>
              Chúng tôi rất vui khi bạn mở tài khoản. Vui lòng nhấn vào nút phía dưới để tiếp tục.
            </Typography>
            <Link to="/login">
              <button className={classes.btn}>Go to Login</button>
            </Link>
            <Typography className={classes.typo}>
              Nếu bạn có bất kỳ câu hỏi nào, chỉ cần trả lời email này, chúng tôi luôn sẵn lòng trợ giúp.
            </Typography>
            <Typography className={classes.typo}>Cheers</Typography>
            <Typography className={classes.typo} style={{ marginTop: '0' }}>
              TA Team
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Activate;
