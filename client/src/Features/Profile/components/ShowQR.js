import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import QRCode from 'qrcode.react';
import { useSelector } from 'react-redux';
import { BASE_URL } from 'utils/config';

function ShowQR({ setOpenQR }) {
    const {auth} = useSelector(state => state);
  return (
    <div>
      <Dialog open={setOpenQR} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle style={{paddingBottom: '0'}} id="alert-dialog-title">{"Quét để theo dõi"}</DialogTitle>
        <DialogContent style={{paddingTop: '0'}}>
        <QRCode
            id='qrcode'
            value={`${BASE_URL}profile/${auth.user._id}`}
            size={290}
            level={'H'}
            includeMargin={true}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenQR(false);
            }}
            color="primary"
          >
            đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ShowQR;
