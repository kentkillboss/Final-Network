import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from 'Redux/Action/adminAction';
import { Button, Input, InputAdornment, Typography } from '@material-ui/core';
import { isBanUser, isUnBanUser } from 'Redux/Action/adminAction';
import { useHistory } from 'react-router';
import { getDataAPI } from 'api/fetchData';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';
import SearchIcon from '@material-ui/icons/Search';

const columns = [
  { id: 'stt', label: 'STT', minWidth: 100 },
  { id: 'code', label: 'Name', minWidth: 100 },
  {
    id: 'population',
    label: 'Email',
    minWidth: 170,
  },
  {
    id: 'size',
    label: 'Phone',
    minWidth: 170,
  },
  {
    id: 'density',
    label: 'Address',
    minWidth: 170,
  },
  {
    id: 'btn',
    label: 'Ban/unBan',
    minWidth: 80,
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
    borderRadius: '5px',
  },
});

export default function Dashboard() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { admin, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const [value, setValue] = useState();
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    dispatch(getUsers(auth));
  }, [dispatch, auth]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleBanUser = (user) => {
    if (window.confirm('Bạn chắc chắn muốn cấm tài khoản này?')) {
    dispatch(isBanUser({ user, auth }));
    history.push('/dashboard');
    }
  };

  const handleUnBanUser = (user) => {
    if (window.confirm('Bạn chắc chắn muốn mở lại tài khoản này?')) {
    dispatch(isUnBanUser({ user, auth }));
    history.push('/dashboard');
    }
  };

  useEffect(() => {
    const newUser = admin.users.filter((user) => user);
    setData(newUser);
  }, [admin.users]);

  useEffect(() => {
    if (value) {
      getDataAPI(`search?username=${value}`, auth.token)
        .then((res) => setNewData(res.data.users))
        .catch((err) => {
          dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
              err: err.response.data.msg,
            },
          });
        });
    }
    if(!value) {
      setNewData(data);
    }
  }, [value, auth.token, dispatch, data]);

  return (
    <>
      <Typography> Số lượng người sử dụng của Dulcie: {admin.result}</Typography>

      <form className={classes.root} noValidate autoComplete="off" style={{marginBottom: '5px'}}>
          <Input
            id="input-with-icon-adornment"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            placeholder='Tìm kiếm User...'
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
      </form>
      
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, backgroundColor: '#5C8D89', color: 'white' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {newData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                return (
                  <TableRow key={item._id}>
                    <TableCell component="th" style={{ width: 100 }} scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      {item.username}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      {item.email}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      {item.mobile}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      {item.address}
                    </TableCell>
                    {
                      item.isBan === true 
                      ? <TableCell style={{ width: 80 }}>
                      <Button variant="contained" color="primary" onClick={() => handleUnBanUser(item)}>
                        UnBan
                      </Button>
                    </TableCell>
                      : <TableCell style={{ width: 80 }}>
                      <Button variant="contained" color="secondary" onClick={() => handleBanUser(item)}>
                        Ban
                      </Button>
                    </TableCell>
                    }
                    
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={admin.users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
