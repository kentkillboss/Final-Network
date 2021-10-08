import React from 'react';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import {
  Box,
  Button,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MessageDisplay from '../messageDisplay/meChat';
import SendIcon from '@material-ui/icons/Send';
import MessageDisplayOther from '../messageDisplay/otherChat';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 80px)',
  },
  container: {
    background: '#ffffff',
    height: 'calc(100vh - 210px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
   
    

  },
  textfield: {
    width: '82%',
    height: '90%',
    margin: 'auto',
    paddingLeft: '8%',
  },
  chat: {
    display: 'grid',
    gridTemplateColumns: '70%',
    marginBottom: '10px',
    paddingRight: '10px',
    justifyContent: 'end',
    justifyItems: 'end',
  },
  otherChat: {
    display: 'grid',
    gridTemplateColumns: '70%',
    marginBottom: '10px',
    paddingLeft: '10px',
    justifyContent: 'start',
    justifyItems: 'start',
  }
}));

function RightSide(props) {
  const classes = useStyles();
  const { auth, message } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const newUser = message.users.find((user) => user._id === id);
    if (newUser) {
      setUser(newUser);
    }
  }, [message.users, id]);
  return (
    <Box className={classes.root}>
      <List style={{ width: '100%', borderBottom: '1px solid grey' }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={user.avatar}></Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.username} secondary={user.fullname} />
          <ListItemText style={{ textAlign: 'right' }}>
            <DeleteIcon />
          </ListItemText>
        </ListItem>
      </List>
      <Box className={classes.container}>
        <Box className={classes.otherChat}>
          <MessageDisplayOther user={user} />
        </Box>
        <Box className={classes.chat}>
          <MessageDisplay user={auth.user} />
        </Box>
      </Box>
      <Box>
        <form>
          <TextField
            size="small"
            className={classes.textfield}
            // variant="none"
            type="text"
            placeholder="Add your cmt..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            }}
          />
          <Button className={classes.btnSubmit} type="submit" color="primary">
            <SendIcon />
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default RightSide;
