import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  LinearProgress,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getNoteById, updateNote } from 'Redux/Action/noteAction';
const useStyles = makeStyles((theme) => ({
  textfield: {
    marginBottom: theme.spacing(1),
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  btn: {
    margin: '0 15px',
  },
  text: {
    color: 'grey',
  },
  accordion: {
    display: 'flex',
  },
  accordionbtn: {
    marginTop: '9px',
  },
}));

function EditNote({ setEditNote }) {
  const classes = useStyles();
  const { auth, noteList } = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const inititalState = {
    title: '...',
    content: '...',
    category: '...',
  };
  const [userData, setUserData] = useState(inititalState);
  const { title, content, category } = userData;
  useEffect(() => {
    setUserData(noteList.noteId);
  }, [noteList.noteId]);

  const handleClose = () => {
    setEditNote(false);
    history.push('/notes');
  };
  useEffect(() => {
    dispatch(getNoteById(id, auth.token));
  }, [id, auth, dispatch]);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateNote({ id, userData, auth }));
  };
  return (
    <div>
      <Dialog open={setEditNote}>
        {alert.loading && <LinearProgress />}
        <IconButton onClick={handleClose} className={classes.close}>
          <Close />
        </IconButton>
        <form onSubmit={handleSubmit}>
          <Typography component="h1" variant="h5" style={{ textAlign: 'center', margin: '10px' }}>
            Chỉnh sửa
          </Typography>
          <DialogContent className={classes.conten}>
            <TextField
              className={classes.textfield}
              label="Title"
              name="title"
              fullWidth
              variant="outlined"
              value={title ? title : ' '}
              onChange={handleInput}
            />

            <TextField
              className={classes.textfield}
              label="Content"
              name="content"
              fullWidth
              multiline
              rows={3}
              maxRows={10}
              variant="outlined"
              value={content ? content : ' '}
              onChange={handleInput}
            />
            <TextField
              className={classes.textfield}
              label="Category"
              name="category"
              fullWidth
              variant="outlined"
              value={category ? category : ' '}
              onChange={handleInput}
            />
          </DialogContent>
          <DialogActions>
            <Button disabled={alert.loading} color="primary" mg={1} type="submit" fullWidth variant="contained">
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default EditNote;
