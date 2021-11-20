import { alpha, Box, makeStyles } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import SearchIcon from '@material-ui/icons/Search';
import { getDataAPI } from 'api/fetchData';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';
import SearchCard from './searchCard';
import CircularProgress from '@material-ui/core/CircularProgress';

Search.propTypes = {};

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.07),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.15),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '90%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
  },
  close: {
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '-27px',
  },
  card: {
    padding: theme.spacing(1),
    position: 'absolute',
    width: '100%',
    maxWidth: '600px',
    [theme.breakpoints.down('sm')]: {
      width: '77%',
      left: '15%',
      marginTop: '2px',
    },
  },
  link: {
    textDecoration: 'none',
  },
  cancelIcon: {
    padding: theme.spacing(0, 2),
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    right: '-16px',
    top: '6px',
    cursor: 'pointer',
  },
}));

function Search(props) {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);

  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    async function handleSearch() {
      if (search) {
        setLoad(true);
        await getDataAPI(`search?username=${search}`, auth.token)
          .then((res) => setUsers(res.data.users))
          .catch((err) => {
            dispatch({
              type: GLOBALTYPES.ALERT,
              payload: {
                err: err.response.data.msg,
              },
            });
          });
        setLoad(false);
      } else {
        setUsers([]);
      }
    }
    handleSearch();
  }, [search, auth.token, dispatch]);

  const handleClose = () => {
    setSearch('');
    setUsers([]);
  };

  return (
    <form>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* .toLowerCase().replace(/ /g, '') */}
        {load && (
          <CircularProgress
            style={{ width: '20px', height: '20px', position: 'absolute', top: '7px', color: 'black' }}
          />
        )}

        {search && <CancelRoundedIcon onClick={handleClose} className={classes.cancelIcon} />}
      </div>

      <Box className={classes.card}>
        {search ? <SearchCard theme={theme} load={load} search={search} user={users} onSubmit={handleClose} /> : ''}
      </Box>
    </form>
  );
}

export default Search;
