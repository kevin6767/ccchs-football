'use client';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Checkbox, Select, MenuItem, Button, Tooltip } from '@mui/material';
import { updateAttendanceRecord } from '@/app/actions/attendance-actions/attendance-update/attendance-update';



export const AttendanceTable = ({ roster, attendance }) => {
  const [selectedMonth, setSelectedMonth] = useState(0); // 0 is January by default
  const [attendanceState, setAttendanceState] = useState({}); // State to hold attendance

  // Function to calculate the number of days in a month (accounts for leap years)
  const getWorkingDaysInMonth = (month) => {
    const year = new Date().getFullYear();
    const workingDays = [];
  
    // Get the number of days in the given month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    // Iterate through each day of the given month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay();
  
      // Skip weekends (Saturday = 6, Sunday = 0)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        workingDays.push({
          day: day,
          month: month
        });
      }
    }
  
    // Return the number of working days
    return workingDays.length;
  };

  // Handle month selection
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Get number of days for the selected month
  const daysInMonth = getWorkingDaysInMonth(selectedMonth);

  useEffect(() => {
    // Initialize attendance state with the data you have
    const initialState = roster.reduce((acc, player, index) => {
      acc[player.rosterId] = attendance[index]?.attendanceRecord || [];
      return acc;
    }, {});
    setAttendanceState(initialState);
  }, [roster, attendance]);

  const handleAttendanceCapture = async (event, dayInMonth, player) => {
    const isChecked = event.target.checked;

    // Update the state for this player and day immediately
    setAttendanceState((prevState) => {
      const updatedRecords = [...(prevState[player.rosterId] || [])];

      // Find the existing record or create a new one
      const recordIndex = updatedRecords.findIndex(
        (record) => record.day === dayInMonth + 1 && record.month === selectedMonth
      );

      if (recordIndex !== -1) {
        // Update existing record
        updatedRecords[recordIndex] = { ...updatedRecords[recordIndex], present: isChecked };
      } else {
        // Add new record if it doesn't exist
        updatedRecords.push({
          day: dayInMonth + 1,
          month: selectedMonth,
          present: isChecked,
        });
      }

      return {
        ...prevState,
        [player.rosterId]: updatedRecords,
      };
    });

    // Now, make the update call with the modified data
    const payload = {
      day: dayInMonth + 1,
      month: selectedMonth,
      rosterId: player.rosterId,
      present: isChecked,
    };

    const attendanceUpdate = await updateAttendanceRecord(payload);
    console.log(attendanceUpdate);
  };

  const shouldCheck = (index, dayInMonth) => {
    const presentOrNot = attendanceState[roster[index].rosterId]?.find(
      (a) => a.day === dayInMonth + 1 && a.month === selectedMonth
    )
    return presentOrNot?.present || false;
  };

  return (
    <>
      {/* Dropdown for selecting the month */}
      <TableContainer component={Paper} elevation={5} sx={{ width: '100%', maxWidth: '1300px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Select value={selectedMonth} onChange={handleMonthChange} sx={{ margin: '10px' }}>
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
          <Button sx={{ justifyContent: 'left' }}>Take Attendance!</Button>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              {/* Generate header cells for each day of the selected month */}
              {Array.from({ length: daysInMonth }, (_, i) => (
                <TableCell key={i} align="center">
                  {i + 1}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {roster.map((player, index) => (
              <TableRow key={player.rosterId}>
                <TableCell sx={{
                      position: "sticky",
                      left: 0,
                      backgroundColor: "grey",
                      color: 'white',
                      zIndex: 15,
                }}>{player.first_name} {player.last_name}</TableCell>
                {/* Generate a checkbox for each day of the selected month */}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const date = new Date(new Date().getFullYear(), selectedMonth, i + 1);
                  const dayOfWeek = date.getDay();
                  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Disable if it's Saturday or Sunday

                  return (
                    <TableCell key={i} align="center">
                      {<Tooltip title={isWeekend && 'Weekend'}> 
                        <span>
                        <Checkbox
                        onChange={(event) => handleAttendanceCapture(event, i, player)}
                        checked={shouldCheck(index, i)}
                        disabled={isWeekend} // Disable the checkbox if it's a weekend
                      />
                      </span>
                      </Tooltip>}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
