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

function createData(first_name, last_name, number, position, squat_max, bench_max, powerclean_max, deadlift_max, weight) {
  return { first_name, last_name, number, position, squat_max, bench_max, powerclean_max, deadlift_max, weight };
}

const rows = [
    createData('Kevin', 'Eslick', 11, 'Tackle', 300, 250, 150, 150, 300),
    createData('John', 'Doe', 22, 'Quarterback', 250, 200, 180, 220, 210),
    createData('Michael', 'Johnson', 33, 'Running Back', 280, 220, 170, 210, 190),
    createData('Tom', 'Williams', 44, 'Wide Receiver', 260, 210, 160, 200, 180),
    createData('Chris', 'Smith', 55, 'Linebacker', 320, 270, 190, 230, 260),
    createData('Andrew', 'Brown', 66, 'Defensive End', 310, 265, 180, 225, 240),
    createData('Brian', 'Jones', 77, 'Cornerback', 230, 185, 150, 170, 160),
    createData('David', 'Miller', 88, 'Safety', 270, 215, 160, 210, 200),
    createData('James', 'Davis', 99, 'Tight End', 290, 245, 170, 220, 230),
    createData('Ryan', 'Moore', 12, 'Guard', 330, 280, 200, 250, 290),
  ];
  

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

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export const BasicTable = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('first_name');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableContainer component={Paper} elevation={5}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button sx={{ padding: '10px' }}>Add New Player</Button>
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
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(rows, getComparator(order, orderBy)).map((row) => (
            <TableRow key={row.first_name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
