import DateFnsUtils from '@date-io/date-fns';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  LinearProgress,
  makeStyles,
  OutlinedInput,
  TextField,
  Typography,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Close } from '@material-ui/icons';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'date-fns';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createNote, deleteNote, getNotes, notifiNote } from 'Redux/Action/noteAction';
import EditNote from './components/EditNote';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    marginTop: '10px',
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: 'calc(100vh - 65px)',
    margin: '0 auto',
    color: 'white',
  },
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
  boxAccordion: {
    display: 'flex',
  },
  button: {
    margin: theme.spacing(0.5),
  },
  accordion: {
    width: '80%',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    textAlign: 'left',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    textAlign: 'left',
    fontWeight: 500,
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
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
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
    dispatch(createNote({ userData, selectedDate, auth }));
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
  const toDay = new Date();
  const date2 = toDay.getDate() + '-' + (toDay.getMonth() + 1) + '-' + toDay.getFullYear();
  useEffect(() => {
    noteList.notes.forEach((item) => {
      if (item.notification === true) {
        const tmp = new Date(item.timer);
        const date = tmp.getDate() + '-' + (tmp.getMonth() + 1) + '-' + tmp.getFullYear();
        if (date === date2) {
          dispatch(notifiNote({ item, auth }));
        }
      }
    });
  }, [noteList, date2, auth, dispatch]);

  const converTimer = (date) => {
    const toDay = new Date(date);
    return toDay.toLocaleString();
  };

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginBottom: '15px' }}>
        Tạo ghi chú
      </Button>
      <Box paddingLeft="4%" style={{ opacity: '0.8' }}>
        {noteList.notes.map((item) => (
          <Box className={classes.boxAccordion}>
            <Accordion className={classes.accordion}>
              <AccordionSummary
                style={{ backgroundColor: 'rgb(169 205 202)', borderRadius: '4px', marginTop: '3px' }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>{item.title}</Typography>
                <Typography className={classes.secondaryHeading}>
                  <b>{item.category}</b>
                  {` - Ngày đến hạn: ${converTimer(item.timer)}`}
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{ backgroundColor: '#F9F8EB' }}>
                <Typography style={{ textAlign: 'left' }}>{item.content}</Typography>
              </AccordionDetails>
            </Accordion>
            <Box style={{ paddingTop: '5px' }}>
              <Link to={`/note/${item._id}`} style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setEditNote(true)}
                  className={classes.button}
                  startIcon={<EditRoundedIcon />}
                >
                  Sửa
                </Button>
              </Link>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteNote(item._id)}
                className={classes.button}
                startIcon={<DeleteRoundedIcon />}
              >
                Xóa
              </Button>
            </Box>
            {editNote && <EditNote setEditNote={setEditNote} />}
          </Box>
        ))}
      </Box>

      <Dialog open={open}>
        {alert.loading && <LinearProgress />}
        <IconButton onClick={handleClose} className={classes.close}>
          <Close />
        </IconButton>
        <DialogTitle id="alert-dialog-title" style={{ paddingBottom: '0' }}>
          {'Tạo mới ghi chú'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent className={classes.conten} style={{ paddingTop: '10px' }}>
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
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justifyContent="space-around">
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date picker dialog"
                  format="MM/dd/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Time picker"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogActions>
            <Button disabled={alert.loading} color="primary" mg={1} type="submit" fullWidth variant="contained">
              Lưu thay đổi
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default Notes;
