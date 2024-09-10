'use client'

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Box, TableSortLabel } from '@mui/material';
import { useState } from 'react';
import { TransitionsModal } from '../modal/modal';
import { deletePlayer } from '@/app/actions/roster-actions/roster-delete/roster-delete';
import { updatePlayer } from '@/app/actions/roster-actions/roster-update/roster-update';


// Comparator function for sorting
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

export const BasicTable = (rows) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('first_name');
  const [updatedPlayer, setUpdatedPlayer] = useState(undefined)
  const [update, setUpdateMode] = useState(false)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleDelete = async (row) => {
    // TODO: do error handling
    const deleteResp = await deletePlayer(row._id)
    console.log(deleteResp)
  }

  const handleUpdate = async (row) => {
    console.log(row)
    setUpdatedPlayer(row)
    setOpen(true)
    setUpdateMode(true)
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()
    console.log(updatedPlayer)
    const updateResp = await updatePlayer(updatedPlayer)
    handleClose()
  }
  

  return (
    <>
    <TableContainer component={Paper} elevation={5}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button sx={{ padding: '10px' }} onClick={handleOpen}>Add New Player</Button>
      </Box>
      <Table sx={{ minWidth: 1300 }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'first_name'}
                direction={orderBy === 'first_name' ? order : 'asc'}
                onClick={() => handleRequestSort('first_name')}
              >
                First Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'last_name'}
                direction={orderBy === 'last_name' ? order : 'asc'}
                onClick={() => handleRequestSort('last_name')}
              >
                Last Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'number'}
                direction={orderBy === 'number' ? order : 'asc'}
                onClick={() => handleRequestSort('number')}
              >
                Number
              </TableSortLabel>
            </TableCell>
            <TableCell>Position</TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'squat_max'}
                direction={orderBy === 'squat_max' ? order : 'asc'}
                onClick={() => handleRequestSort('squat_max')}
              >
                Squat
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'bench_max'}
                direction={orderBy === 'bench_max' ? order : 'asc'}
                onClick={() => handleRequestSort('bench_max')}
              >
                Bench
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'powerclean_max'}
                direction={orderBy === 'powerclean_max' ? order : 'asc'}
                onClick={() => handleRequestSort('powerclean_max')}
              >
                Power Clean
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'deadlift_max'}
                direction={orderBy === 'deadlift_max' ? order : 'asc'}
                onClick={() => handleRequestSort('deadlift_max')}
              >
                Deadlift
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'weight'}
                direction={orderBy === 'weight' ? order : 'asc'}
                onClick={() => handleRequestSort('weight')}
              >
                Weight
              </TableSortLabel>
            </TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.row.map((row) => (
            <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.first_name}
              </TableCell>
              <TableCell>{row.last_name}</TableCell>
              <TableCell>{row.number}</TableCell>
              <TableCell>{row.position}</TableCell>
              <TableCell>{row.squat_max}</TableCell>
              <TableCell>{row.bench_max}</TableCell>
              <TableCell>{row.powerclean_max}</TableCell>
              <TableCell>{row.deadlift_max}</TableCell>
              <TableCell>{row.weight}</TableCell>
              <TableCell><Button onClick={() => handleDelete(row)}>Delete</Button></TableCell>
              <TableCell><Button onClick={() => handleUpdate(row)}>Update</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TransitionsModal update={update} handleUpdateSubmit={handleUpdateSubmit} setUpdatedPlayer={setUpdatedPlayer} handleUpdate={handleUpdate} updatedPlayer={updatedPlayer} {...{
        open, handleClose, 
    }}/>
    </>
  );
};
