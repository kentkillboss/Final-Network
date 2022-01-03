import { Box, IconButton, makeStyles, TextareaAutosize, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import { Close } from '@material-ui/icons';
import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
import CancelIcon from '@material-ui/icons/Cancel';
import EmojiEmotionsRoundedIcon from '@material-ui/icons/EmojiEmotionsRounded';
import PhotoLibraryRoundedIcon from '@material-ui/icons/PhotoLibraryRounded';
import Icons from 'Components/Icons';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';
import { createPost, updatePost } from 'Redux/Action/postAction';

StatusModal.propTypes = {
  setShowModal: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  textarea: {
    width: '500px',
    outline: 'none',
    border: 'none',
    resize: 'none',
    margin: '0 10px',
    [theme.breakpoints.down('sm')]: {
      width: '94%',
    },
  },
  content: {
    padding: 0,
    overflowY: 'none',
  },
  title: {
    padding: '7px 0',
    textAlign: 'center',
  },
  close: {
    position: 'absolute',
    top: theme.spacing(0),
    right: theme.spacing(1),
    zIndex: 1,
  },
  cancel: {
    position: 'absolute',
    top: '-2px',
    right: '-1px',
    zIndex: 1,
  },
  boxIcon: {
    width: '95%',
    height: '50px',
    border: ' 0.5px solid #eccece',
    margin: 'auto',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageList: {
    width: 494,
    height: 166,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  dialog: {
    minWidth: 349,
  },
  video: {
    width: '100%',
    // height: 240,
  },
  boxVideo: {
    width: '59%',
    height: '50%',
    margin: 'auto',
    position: 'relative',
  },
  boxImageList: {
    width: '95%',
    margin: '10px auto',
    [theme.breakpoints.down('sm')]: {
      // width: '90%',
    },
  },
}));

function StatusModal({ setShowModal }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { auth, status, socket } = useSelector((state) => state);
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);
  const videoRef = useRef();
  const refCanvas = useRef();
  const [tracks, setTracks] = useState('');
  const [showIcon, setShowIcon] = useState(null);
  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    let err = '';
    let newImages = [];
    files.forEach((file) => {
      if (!file) return (err = 'File không tồn tại.');
      if (file.size > 1024 * 1024 * 10) {
        return (err = 'Ảnh phải không quá 10mb.');
      }
      return newImages.push(file);
    });
    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setImages([...images, ...newImages]);
  };

  const handleDeleteImages = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };
  const handleStream = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
          const track = mediaStream.getTracks();
          setTracks(track[0]);
        })
        .catch((err) => {
          dispatch({type: GLOBALTYPES.ALERT, payload: {error: 'Vui lòng bật camera!'}});
          setStream(false);
        });
    }
  };
  const handleCapture = () => {
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    refCanvas.current.setAttribute('width', width);
    refCanvas.current.setAttribute('height', height);

    const ctx = refCanvas.current.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, width, height);
    let URL = refCanvas.current.toDataURL();
    setImages([...images, { camera: URL }]);
  };
  const handleStopStream = () => {
    tracks.stop();
    setStream(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: 'Vui lòng thêm ảnh hoặc video',
        },
      });
    let arr = [];
    images.forEach((img) => {
      if (img.type === 'video/mp4') {
        arr.push(img.type);
      }
    });
    if (arr.length >= 2) {
      return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: 'Bạn không thể đăng nhiều hơn 2 video 1 lúc!!' } });
    }

    if (status.onEdit) {
      dispatch(updatePost({ content, images, auth, status }));
    } else {
      dispatch(createPost({ content, images, auth, socket }));
    }

    setContent('');
    setImages([]);
    if (tracks) tracks.stop();
    dispatch({
      type: GLOBALTYPES.STATUS,
      payload: false,
    });
  };

  useEffect(() => {
    if (status.onEdit) {
      setContent(status.content);
      setImages(status.images);
    }
  }, [status]);

  const imageShow = (src) => {
    return <img src={src} className={classes.image} alt="images" />;
  };
  const videoShow = (src) => {
    return <video controls src={src} alt="images" />;
  };
  const handleClick = (event) => {
    setShowIcon(event.currentTarget);
  };

  return (
    <div>
      <Dialog open={status} className={classes.dialog}>
        <Box style={{ minWidth: '311px' }}>
          <IconButton
            onClick={() =>
              dispatch({
                type: GLOBALTYPES.STATUS,
                payload: false,
              })
            }
            className={classes.close}
          >
            <Close />
          </IconButton>
          <form onSubmit={handleSubmit}>
            <DialogTitle className={classes.title}>Tạo bài viết</DialogTitle>
            <hr color="#f1f1f1" style={{ width: '100%', margin: '0' }}></hr>

            <DialogContent className={classes.content}>
              <DialogContentText></DialogContentText>
              <TextareaAutosize
                name="content"
                value={content}
                className={classes.textarea}
                onChange={(e) => setContent(e.target.value)}
                aria-label="minimum height"
                minRows={7}
                placeholder={`${auth.user.username}, Bạn đang nghĩ gì ?`}
              />
              <Box className={classes.boxImageList}>
                <ImageList rowHeight={160} className={classes.imageList} cols={3}>
                  {images.map((img, index) => (
                    <ImageListItem key={index} cols={1}>
                      {img.camera ? (
                        imageShow(img.camera)
                      ) : img.url ? (
                        <>{img.url.match(/video/i) ? videoShow(img.url) : imageShow(img.url)}</>
                      ) : (
                        <>
                          {img.type.match(/video/i)
                            ? videoShow(URL.createObjectURL(img))
                            : imageShow(URL.createObjectURL(img))}
                        </>
                      )}
                      <IconButton onClick={() => handleDeleteImages(index)} className={classes.cancel}>
                        <CancelIcon />
                      </IconButton>
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>
              {stream && (
                <Box className={classes.boxVideo}>
                  <video autoPlay muted ref={videoRef} className={classes.video} />

                  <IconButton onClick={handleStopStream} style={{ position: 'absolute', top: '0px', right: '-7px' }}>
                    <CancelIcon />
                  </IconButton>
                  <canvas ref={refCanvas} style={{ display: 'none' }} />
                </Box>
              )}
              <Box className={classes.boxIcon}>
                <Typography>Thêm vào bài viết</Typography>
                <Box style={{ display: 'flex', justifyContent: 'space-around', width: '25%' }}>
                  {stream ? (
                    <IconButton onClick={handleCapture} style={{ padding: '4px' }}>
                      <CameraAltRoundedIcon style={{ color: 'green', cursor: 'pointer' }} />
                    </IconButton>
                  ) : (
                    <>
                      <IconButton onClick={handleStream} style={{ padding: '4px' }}>
                        <CameraAltRoundedIcon style={{ color: 'green', cursor: 'pointer' }} />
                      </IconButton>
                      <IconButton
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        style={{ padding: '4px' }}
                      >
                        <EmojiEmotionsRoundedIcon style={{ color: 'yellow', cursor: 'pointer' }} />
                      </IconButton>

                      <IconButton component="label" size="sm" style={{ padding: '4px' }}>
                        <PhotoLibraryRoundedIcon style={{ color: 'blue', cursor: 'pointer' }} />
                        <input
                          type="file"
                          multiple
                          name="file"
                          id="file"
                          accept="image/*, video/*"
                          hidden
                          onChange={handleChangeImages}
                        />
                      </IconButton>
                    </>
                  )}
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button type="submit" color="primary" fullWidth variant="contained">
                Lưu thay đổi
              </Button>
            </DialogActions>
            {showIcon && (
              <Icons showIcon={showIcon} setShowIcon={setShowIcon} setContent={setContent} content={content} />
            )}
          </form>
        </Box>
      </Dialog>
    </div>
  );
}

export default StatusModal;
