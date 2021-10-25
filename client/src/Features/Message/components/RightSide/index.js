import {
  Box,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  TextField,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import EmojiEmotionsRoundedIcon from '@material-ui/icons/EmojiEmotionsRounded';
import PhoneIcon from '@material-ui/icons/Phone';
import PhotoLibraryRoundedIcon from '@material-ui/icons/PhotoLibraryRounded';
import SendIcon from '@material-ui/icons/Send';
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import Icons from 'Components/Icons';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';
import { addMessage, deleteConversation, getMessages, loadMoreMessages } from 'Redux/Action/messageAction';
import { imageUpload } from 'utils/imageUpload';
import MessageDisplay from '../messageDisplay/meChat';
import MessageDisplayOther from '../messageDisplay/otherChat';
import fileIcon from 'images/file.png';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxHeight: '500px',
  },
  container: {
    // width: '100%',
    height: 'calc(100vh - 200px)',
    // display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    // padding: '0 10px',
  },
  // chatDisplay: {
  //   // display: 'grid',
  //   // gridTemplateColumns: '70%',
  //   // marginBottom: '10px',
  //   // paddingRight: '10px',
  //   // justifyItems: 'end',
  //   //  flexDirection: 'column',
  //   // justifyContent: 'flex-end',
  //   width: '100%',
  //   minHeight: '100%',
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'flex-end'
  // },
  textfield: {
    width: '82%',
    height: '90%',
    margin: 'auto',
    paddingLeft: '8%',
  },
  chat: {
    display: 'grid',
    gridTemplateColumns: '50%',
    marginBottom: '10px',
    paddingRight: '10px',
    justifyContent: 'end',
    justifyItems: 'end',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '70%',
    },
  },
  otherChat: {
    display: 'grid',
    gridTemplateColumns: '50%',
    marginBottom: '10px',
    paddingLeft: '10px',
    justifyContent: 'start',
    justifyItems: 'start',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '70%',
    },
  },
  boxIcon: {
    width: '90%',
    height: '50px',
    border: ' 0.5px solid #eccece',
    margin: 'auto',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancel: {
    position: 'absolute',
    top: '-2px',
    right: '-1px',
    zIndex: 1,
  },
}));

function RightSide(props) {
  const classes = useStyles();
  const { auth, message, socket, peer, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [text, setText] = useState('');
  const [showIcon, setShowIcon] = useState(false);
  const [media, setMedia] = useState([]);
  const [loadMedia, setLoadMedia] = useState(false);
  const refDisplay = useRef();
  const pageEnd = useRef();

  const [data, setData] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);
  const [isLoadMore, setIsLoadMore] = useState(0);

  useEffect(() => {
    const newData = message.data.find((item) => item._id === id);
    if (newData) {
      setData(newData.messages);
      setResult(newData.result);
      setPage(newData.page);
    }
  }, [message.data, id]);

  useEffect(() => {
    if (id && message.users.length > 0) {
      setTimeout(() => {
        refDisplay.current.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }, 50);
      const newUser = message.users.find((user) => user._id === id);
      if (newUser) {
        setUser(newUser);
      }
    }
  }, [message.users, id]);

  const handleChangeMedia = (e) => {
    const files = [...e.target.files];
    let err = '';
    let newMedia = [];
    files.forEach((file) => {
      if (!file) return (err = 'File does not exits.');
      if (file.size > 1024 * 1024 * 5) {
        return (err = 'The image/video largest is 5mb.');
      }
      return newMedia.push(file);
    });
    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setMedia([...media, ...newMedia]);
    
  };
  
  const imageShow = (src) => {
    return <img src={src} alt="images" />;
  };
  const videoShow = (src) => {
    return <video controls src={src} alt="images" />;
  };
  const fileShow = () => {
    return <img controls src={fileIcon} alt="images" />;
  };
  const handleDeleteImages = (index) => {
    const newArr = [...media];
    newArr.splice(index, 1);
    setMedia(newArr);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && media.length === 0) return;
    setText('');
    setMedia([]);
    setLoadMedia(true);

    let newArr = [];
    if (media.length > 0) newArr = await imageUpload(media);
    const msg = {
      sender: auth.user._id,
      recipient: id,
      text,
      media: newArr,
      createdAt: new Date().toISOString(),
    };
    setLoadMedia(false);
    await dispatch(addMessage({ msg, auth, socket }));
    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  };
  const handleConversation = () => {
    if (window.confirm('Bạn chắc chắn xoá!')) {
      dispatch(deleteConversation({ auth, id }));
      return history.push('/message');
    }
  };

  useEffect(() => {
    const getMessagesData = async () => {
      if (message.data.every((item) => item._id !== id)) {
        await dispatch(getMessages({ auth, id }));

        setTimeout(() => {
          refDisplay.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          });
        }, 50);
      }
    };
    getMessagesData();
  }, [dispatch, auth, id, message.data]);

  //Load more
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoadMore((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(pageEnd.current);
  }, [setIsLoadMore]);

  useEffect(() => {
    if (isLoadMore > 1) {
      if (result >= page * 9) {
        dispatch(loadMoreMessages({ auth, id, page: page + 1 }));
        setIsLoadMore(1);
      }
    }
    // eslint-disable-next-line
  }, [isLoadMore]);

  const caller = ({ video }) => {
    const { _id, avatar, username, fullname } = user;
    const msg = {
      sender: auth.user._id,
      recipient: _id,
      avatar,
      username,
      fullname,
      video,
    };
    dispatch({ type: GLOBALTYPES.CALL, payload: msg });
  };

  const callUser = ({ video }) => {
    const { _id, avatar, username, fullname } = auth.user;

    const msg = {
      sender: _id,
      recipient: user._id,
      avatar,
      username,
      fullname,
      video,
    };

    if (peer.open) {
      msg.peerId = peer._id;
    }

    socket.emit('callUser', msg);
  };

  const handleCall = () => {
    caller({ video: false });
    callUser({ video: false });
  };

  const handleVideoCall = () => {
    caller({ video: true });
    callUser({ video: true });
  };

  return (
    <>
      <Box className={classes.root}>
        {user.length !== 0 && (
          <List style={{ width: '100%', borderBottom: '1px solid #ece0e0', padding: 0, marginTop: '8px' }}>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={user.avatar} style={{filter: theme ? 'invert(1)' : 'invert(0)'}}></Avatar>
              </ListItemAvatar>
              <ListItemText primary={<b>{user.username}</b>} secondary={user.fullname} />
              <ListItemText style={{ textAlign: 'right' }}>
                <IconButton onClick={handleCall} style={{ color: '#5C8D89', filter: theme ? 'invert(1)' : 'invert(0)' }}>
                  <PhoneIcon />
                </IconButton>
                <IconButton onClick={handleVideoCall} style={{ color: '#5C8D89', filter: theme ? 'invert(1)' : 'invert(0)' }}>
                  <VideocamRoundedIcon />
                </IconButton>
                <IconButton onClick={handleConversation} style={{ color: '#df1b1b', filter: theme ? 'invert(1)' : 'invert(0)' }}>
                  <DeleteIcon />
                </IconButton>
              </ListItemText>
            </ListItem>
          </List>
        )}

        <Box className={classes.container}>
          <Box ref={refDisplay} className={classes.chatDisplay}>
            <button style={{ marginTop: '-25px', opacity: 0 }} ref={pageEnd}>
              LoadMore
            </button>
            {data.map((msg, index) => (
              <Box key={index}>
                {msg.sender !== auth.user._id && (
                  <Box className={classes.otherChat}>
                    <MessageDisplayOther user={user} msg={msg} />
                  </Box>
                )}
                {msg.sender === auth.user._id && (
                  <Box className={classes.chat}>
                    <MessageDisplay user={auth.user} msg={msg} data={data} />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
          {loadMedia && <CircularProgress />}
          <Box style={{ width: '95%', margin: '10px auto' }}>
            <ImageList rowHeight={160} className={classes.imageList} cols={6}>
              {media.map((img, index) => (
                <ImageListItem key={index} cols={1}>
                  {img.type.match(/video/i)
                    ? videoShow(URL.createObjectURL(img))
                    : img.type.includes('image/png') || img.type.includes('image/jpeg')
                      ? imageShow(URL.createObjectURL(img))
                      : fileShow()}

                  <IconButton onClick={() => handleDeleteImages(index)} className={classes.cancel}>
                    <CancelIcon />
                  </IconButton>
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box className={classes.boxIcon}>
            <TextField
             style={{ marginLeft: '5px', filter: theme ? 'invert(1)' : 'invert(0)', color: theme ? 'white' : 'black' }}
              placeholder="Add your cmt..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            
              fullWidth
            ></TextField>
            <Box style={{ display: 'flex', justifyContent: 'space-around', width: '20%' }}>
              <IconButton style={{ padding: '4px' }} onClick={() => setShowIcon(true)}>
                <EmojiEmotionsRoundedIcon style={{ color: 'yellow', cursor: 'pointer' }} />
              </IconButton>
              {showIcon && <Icons setContent={setText} content={text} setShowIcon={setShowIcon} />}
              <IconButton component="label" size="sm" style={{ padding: '4px' }}>
                <PhotoLibraryRoundedIcon style={{ color: 'blue', cursor: 'pointer' }} />
                <input
                  type="file"
                  multiple
                  name="file"
                  id="file"
                  accept="image/*, video/*"
                  onChange={handleChangeMedia}
                  hidden
                />
              </IconButton>
              <Button
                disabled={text || media.length > 0 ? false : true}
                className={classes.btnSubmit}
                type="submit"
                color="primary"
              >
                <SendIcon />
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
}

export default RightSide;
