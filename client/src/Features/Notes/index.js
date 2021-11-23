import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  makeStyles,
  OutlinedInput,
  TextField,
  Typography,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createNote, deleteNote, getNotes } from 'Redux/Action/noteAction';
import EditNote from './components/EditNote';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
function Notes(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { auth, noteList } = useSelector((state) => state);
  const inititalState = {
    title: '',
    content: '',
    category: '',
  };
  const [userData, setUserData] = useState(inititalState);
  const { title, content, category } = userData;
  const [open, setOpen] = React.useState(false);
  const [editNote, setEditNote] = useState(false);

  useEffect(() => {
    dispatch(getNotes(auth.token));
  }, [auth.token, dispatch]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ userData, auth }));
    const { title, content, category } = userData;
    if (!title || !content || !category) return;
    setOpen(false);
    setUserData('');
  };
  const handleDeleteNote = (id) => {
    if (window.confirm('Bạn chắc chắn muốn xoá bài viết này?')) {
      dispatch(deleteNote({ id, auth }));
      //   history.push('/');
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Create Note</Button>
      {/* <Grid container> */}
      {noteList.notes.map((item) => (
        //   <Grid key={item._id} xs={12} item>
        //     {item.title}
        //   </Grid>
        <Box className={classes.accordion}>
          <Accordion style={{ width: '500px' }}>
            <AccordionSummary
              style={{ backgroundColor: '#5C8D89' }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: '#F9F8EB' }}>
              <Typography>{item.content}</Typography>
            </AccordionDetails>
          </Accordion>
          <Box>
            <Link to={`/note/${item._id}`}>
              <Button className={classes.accordionbtn} onClick={() => setEditNote(true)}>
                Edit
              </Button>
            </Link>
            <Button className={classes.accordionbtn} onClick={() => handleDeleteNote(item._id)}>
              Delete
            </Button>
          </Box>
          {editNote && <EditNote setEditNote={setEditNote} />}
        </Box>
      ))}
      {/* </Grid> */}

      <Dialog open={open}>
        {alert.loading && <LinearProgress />}
        <IconButton onClick={handleClose} className={classes.close}>
          <Close />
        </IconButton>
        <form onSubmit={handleSubmit}>
          <DialogContent className={classes.conten}>
            <FormControl fullWidth margin="normal" variant="outlined" style={{ marginTop: '30px', marginBottom: 0 }}>
              <InputLabel htmlFor="outlined-adornment-password">Title</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                className={classes.textfield}
                label="Title"
                name="title"
                fullWidth
                variant="outlined"
                value={title}
                onChange={handleInput}
              />
            </FormControl>

            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Content</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                multiline
                rows={3}
                maxRows={10}
                label="Content"
                name="content"
                value={content}
                fullWidth
                variant="outlined"
                onChange={handleInput}
              />
            </FormControl>
            <TextField
              className={classes.textfield}
              label="Category"
              name="category"
              fullWidth
              variant="outlined"
              value={category}
              onChange={handleInput}
            />
          </DialogContent>
          <DialogActions>
            <Button disabled={alert.loading} color="primary" mg={1} type="submit" fullWidth variant="contained">
              Lưu thay đổi
            </Button>
          </DialogActions>
        </form>
        <p>{new Date().toLocaleDateString()}</p>
      </Dialog>
    </div>
  );
}

export default Notes;
