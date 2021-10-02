import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
} from 'react-share';

function ShareModal({ setIsShare, url }) {
  const handleClose = () => {
    setIsShare(false);
  };
  return (
    <Dialog onClose={handleClose} maxWidth="xs" aria-labelledby="simple-dialog-title" open={() => setIsShare(true)}>
      <DialogTitle id="simple-dialog-title">Share to application</DialogTitle>
      <List>
        <FacebookShareButton url={url} style={{ width: '100%' }}>
          <ListItem button>
            <ListItemAvatar>
              <Avatar>
                <FacebookIcon round={true} size={32} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Facebook" />
          </ListItem>
        </FacebookShareButton>
        <TelegramShareButton url={url} style={{ width: '100%' }}>
          <ListItem button>
            <ListItemAvatar>
              <Avatar>
                <TelegramIcon round={true} size={32} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Telegram" />
          </ListItem>
        </TelegramShareButton>
        <EmailShareButton url={url} style={{ width: '100%' }}>
          <ListItem button>
            <ListItemAvatar>
              <Avatar>
                <EmailIcon round={true} size={32} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Email" />
          </ListItem>
        </EmailShareButton>
        <TwitterShareButton url={url} style={{ width: '100%' }}>
          <ListItem button>
            <ListItemAvatar>
              <Avatar>
                <TwitterIcon round={true} size={32} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Twitter" />
          </ListItem>
        </TwitterShareButton>
      </List>
    </Dialog>
  );
}

export default ShareModal;
