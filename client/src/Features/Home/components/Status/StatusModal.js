import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, IconButton, makeStyles, TextareaAutosize, Typography } from '@material-ui/core';
import { mergeClasses } from '@material-ui/styles';
import { Close } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
import EmojiEmotionsRoundedIcon from '@material-ui/icons/EmojiEmotionsRounded';
import PhotoLibraryRoundedIcon from '@material-ui/icons/PhotoLibraryRounded';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { createPost, updatePost } from 'Redux/Action/postAction';
import Icons from 'Components/Icons';

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
  },
  content: {
    padding: 0,
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
  const [showIcon, setShowIcon] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    let err = '';
    let newImages = [];
    files.forEach((file) => {
      if (!file) return (err = 'File does not exits.');
      if (file.size > 1024 * 1024 * 5) {
        return (err = 'The image largest is 5mb.');
      }
      return newImages.push(file);
    });
    console.log(files);
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
        .catch((err) => console.log(err));
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
          error: 'Please add your photo.',
        },
      });

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
    return <img src={src} alt="images" />;
  };
  const videoShow = (src) => {
    return <video controls src={src} alt="images" />;
  };

  return (
    <div>
      <Dialog open={status} className={classes.dialog}>
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
          <DialogTitle className={classes.title}>Tao Bai Viet</DialogTitle>
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
              placeholder={`${auth.user.username}, What are you thinking ?`}
            />
            <Box style={{ width: '95%', margin: '10px auto' }}>
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
              <Box style={{ width: '50%', height: '50%', margin: 'auto' }}>
                <video autoPlay muted ref={videoRef} width="320" height="240" />

                <IconButton onClick={handleStopStream} style={{ position: 'absolute', bottom: '287px', right: '72px' }}>
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
                    <IconButton style={{ padding: '4px' }} onClick={() => setShowIcon(true)}>
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
              Subscribe
            </Button>
          </DialogActions>
          {showIcon && <Icons setShowIcon={setShowIcon} setContent={setContent} content={content} />}
        </form>
      </Dialog>
    </div>
  );
}

export default StatusModal;
