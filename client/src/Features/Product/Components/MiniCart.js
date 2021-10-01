import { Box, Button, IconButton, makeStyles, Paper, Typography } from '@material-ui/core';
import { CheckCircleOutline, Close } from '@material-ui/icons';
import { hideMiniCart } from 'Features/Cart/cartSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    position: 'absolute',
    top: '100%',
    right: '1%',
    width: '300px',
    padding: theme.spacing(2, 0),
    height: '60px',
    boxShadow: 'rgb(179 179 179) 1px 1px 15px',
    borderRadius: '6px',
    alignItems: 'center',

    '&::before': {
      content: "''",
      position: 'absolute',
      borderWidth: '10px 15px',
      borderStyle: 'solid',
      borderColor: 'transparent transparent rgb(255, 255, 255)',
      top: '-20px',
      right: '15px',
    },
  },

  message: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    color: 'rgb(51, 51, 51)',
    fontSize: '13px',
  },

  btn: {
    marginTop: theme.spacing(1),
    backgroundColor: 'rgb(255, 57, 69)',
    color: 'rgb(255, 255, 255)',
    justifyContent: 'center',
  },

  closeBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: theme.palette.grey[500],
  },
}));

function MiniCart(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const isShowMiniCart = useSelector((state) => state.cart.showMiniCart);
  const handleClose = () => {
    const action = hideMiniCart();
    dispatch(action);
  };

  const handleClickToCart = () => {
    handleClose();
    history.push('/cart');
  };

  return (
    <Box>
      {isShowMiniCart && (
        <Paper className={classes.root}>
          <IconButton className={classes.closeBtn} onClick={handleClose} size="small">
            <Close />
          </IconButton>
          <Box className={classes.message}>
            <CheckCircleOutline style={{ color: 'rgb(76, 175, 80)' }} />
            <Typography>Thêm vào giỏ hàng thành công</Typography>
          </Box>
          <Button className={classes.btn} onClick={handleClickToCart}>
            Xem giỏ hàng và thanh toán
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default MiniCart;
