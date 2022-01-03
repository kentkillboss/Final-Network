import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Input,
  Divider,
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
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
import './isTyping.scss';
const useStyles = makeStyles((theme) => ({
  container: {
    height: 'calc(100vh - 200px)',
    flexDirection: 'column',
    overflowY: 'auto',
  },

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
  box: {
    minHeight: 55,
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    backgroundColor: '#e1e7eb',
  },
  isTyping: {
    position: 'absolute',
    bottom: 73,
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
  const [showIcon, setShowIcon] = useState(null);
  const [media, setMedia] = useState([]);
  const [loadMedia, setLoadMedia] = useState(false);
  const refDisplay = useRef();
  const pageEnd = useRef();

  const [data, setData] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);
  const [isLoadMore, setIsLoadMore] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

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
      if (!file) return (err = 'File không tồn tại.');
      if (file.size > 1024 * 1024 * 10) {
        return (err = 'Tệp phải không quá 10mb.');
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
  const handleClick = (event) => {
    setShowIcon(event.currentTarget);
  };
  const typingref = useRef();
  const handleChange = (e) => {
    setText(e.target.value);
    if (typingref.current) {
      clearTimeout(typingref.current);
    }
    typingref.current = setTimeout(() => {
      setText(e.target.value);
    }, 2000);
    // setIsTyping(true);
    socket.emit('typing', 'nhap');
  };
  const handleTyping = () => {
    // setTimeout(() => {
    //   setIsTyping(false);
    // }, 2000);
    if (typingref.current) {
      clearTimeout(typingref.current);
    }
    typingref.current = setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };
  socket.on('typing', (data) => {
    setIsTyping(true);
    handleTyping();
  });

  return (
    <>
      <Box className={classes.root}>
        {user.length !== 0 && (
          <List style={{ width: '100%', borderBottom: '1px solid #ece0e0', padding: 0, marginTop: '8px' }}>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={user.avatar} style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}></Avatar>
              </ListItemAvatar>
              <ListItemText primary={<b>{user.username}</b>} secondary={user.fullname} />
              <ListItemText style={{ textAlign: 'right' }}>
                <IconButton
                  onClick={handleCall}
                  style={{ color: '#5C8D89', filter: theme ? 'invert(1)' : 'invert(0)' }}
                >
                  <PhoneIcon />
                </IconButton>
                <IconButton
                  onClick={handleVideoCall}
                  style={{ color: '#5C8D89', filter: theme ? 'invert(1)' : 'invert(0)' }}
                >
                  <VideocamRoundedIcon />
                </IconButton>
                <IconButton
                  onClick={handleConversation}
                  style={{ color: '#df1b1b', filter: theme ? 'invert(1)' : 'invert(0)' }}
                >
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
                    : img.type.includes('image/png') ||
                      img.type.includes('image/jpeg') ||
                      img.type.includes('image/gif')
                      ? imageShow(URL.createObjectURL(img))
                      : fileShow()}

                  <IconButton onClick={() => handleDeleteImages(index)} className={classes.cancel}>
                    <CancelIcon />
                  </IconButton>
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
          {isTyping && (
            <div className={classes.isTyping}>
              <div className="typing-indicator">
                <span className="span"></span>
                <span className="span"></span>
                <span className="span"></span>
              </div>
            </div>
          )}
        </Box>
        {/* className={classes.isTyping} */}
        <form onSubmit={handleSubmit}>
          <Box className={classes.box}>
            <Input
              value={text}
              onChange={handleChange}
              fullWidth
              disableUnderline
              placeholder="Nhập nội dung..."
              startAdornment={
                <InputAdornment position="start">
                  <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <EmojiEmotionsRoundedIcon style={{ color: '#ec7d14' }} />
                  </IconButton>
                  {showIcon && (
                    <Icons setContent={setText} content={text} showIcon={showIcon} setShowIcon={setShowIcon} />
                  )}
                </InputAdornment>
              }
              endAdornment={
                <Box style={{ display: 'flex' }} spacing={0.5} mr={1.5}>
                  <IconButton component="label" size="small">
                    <AttachFileRoundedIcon style={{ color: '#ec7d14' }} width={24} height={24} />
                    <input
                      type="file"
                      multiple
                      name="file"
                      id="file"
                      accept=".docx, .doc, .xlsx, .xls, .txt"
                      onChange={handleChangeMedia}
                      hidden
                    />
                  </IconButton>
                  <IconButton component="label" size="small">
                    <PhotoLibraryRoundedIcon style={{ color: '#ec7d14' }} width={24} height={24} />
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
                </Box>
              }
              sx={{ height: '100%' }}
            />

            <Divider orientation="vertical" flexItem />

            <IconButton
              disabled={text || media.length > 0 ? false : true}
              className={classes.btnSubmit}
              type="submit"
              color="primary"
              sx={{ mx: 1 }}
            >
              <SendIcon width={24} height={24} />
            </IconButton>
          </Box>
        </form>
      </Box>
    </>
  );
}

export default RightSide;
