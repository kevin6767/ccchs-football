'use client'
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Checkbox, Select, MenuItem, Button } from '@mui/material';
import { updateAttendanceRecord } from '@/app/actions/attendance-actions/attendance-update/attendance-update';

export const AttendanceTable = ({ roster, attendance }) => {
  const [selectedMonth, setSelectedMonth] = useState(0); // 0 is January by default
  // Function to calculate the number of days in a month (accounts for leap years)
  const getDaysInMonth = (month) => {
    const year = new Date().getFullYear();
    return new Date(year, month + 1, 0).getDate(); // month is 0-indexed in JS
  };

  // Handle month selection
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Get number of days for the selected month
  const daysInMonth = getDaysInMonth(selectedMonth);

  const handleAttedanceCapture = async (event, dayInMonth, player) => {
    const payload = {
        day: dayInMonth + 1, 
        month: selectedMonth,
        rosterId: player.rosterId,
        present: event.target.checked
    }
    const attedanceUpdate = await updateAttendanceRecord(payload)
  }

  return (
    <>
      {/* Dropdown for selecting the month */}

      <TableContainer component={Paper} elevation={5} sx={{width: '100%', maxWidth: '1400px'}}>
        <div style={{
            display: 'flex', 
            justifyContent: 'space-between'
        }}>
      <Select value={selectedMonth} onChange={handleMonthChange} sx={{margin: '10px'}}>
        <MenuItem value={0}>January</MenuItem>
        <MenuItem value={1}>February</MenuItem>
        <MenuItem value={2}>March</MenuItem>
        <MenuItem value={3}>April</MenuItem>
        <MenuItem value={4}>May</MenuItem>
        <MenuItem value={5}>June</MenuItem>
        <MenuItem value={6}>July</MenuItem>
        <MenuItem value={7}>August</MenuItem>
        <MenuItem value={8}>September</MenuItem>
        <MenuItem value={9}>October</MenuItem>
        <MenuItem value={10}>November</MenuItem>
        <MenuItem value={11}>December</MenuItem>
      </Select>
      <Button sx={{justifyContent: 'left'}}>
            Take Attendance!
        </Button>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              {/* Generate header cells for each day of the selected month */}
              {Array.from({ length: daysInMonth }, (_, i) => (
                <TableCell key={i} align='center'>{i + 1}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {roster.map((player) => (
              <TableRow key={player.rosterId}>
                <TableCell key={player.rosterId}>{player.first_name} {player.last_name}</TableCell>
                {/* Generate a checkbox for each day of the selected month */}
                {Array.from({ length: daysInMonth }, (_, i) => (
                <TableCell key={i} align='center'>
                  <Checkbox
                    onChange={(event) => handleAttedanceCapture(event, i, player)}
                  />
                </TableCell>
              ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
