import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  IconButton,
  InputLabel,
  LinearProgress,
  makeStyles,
  OutlinedInput,
  TextField,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { getDataAPI } from 'api/fetchData';
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
    title: '',
    content: '',
    category: '',
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
          <DialogContent className={classes.conten}>
            <FormControl fullWidth margin="normal" variant="outlined" style={{ marginTop: '30px', marginBottom: 0 }}>
              {/* <InputLabel htmlFor="outlined-adornment-password">Title</InputLabel> */}
              <OutlinedInput
                id="outlined-adornment-password"
                className={classes.textfield}
                // label="Title"
                name="title"
                fullWidth
                variant="outlined"
                value={title}
                onChange={handleInput}
              />
            </FormControl>

            <FormControl fullWidth margin="normal" variant="outlined">
              {/* <InputLabel htmlFor="outlined-adornment-password">Content</InputLabel> */}
              <OutlinedInput
                id="outlined-adornment-password"
                multiline
                rows={3}
                maxRows={10}
                // label="Content"
                name="content"
                value={content}
                fullWidth
                variant="outlined"
                onChange={handleInput}
              />
            </FormControl>
            <TextField
              className={classes.textfield}
              //   label="Category"
              name="category"
              fullWidth
              variant="outlined"
              value={category}
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
