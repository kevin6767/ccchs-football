import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export const AttendanceTable = () => {

    return <TableContainer component={Paper} elevation={5}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Name
                    </TableCell>
                    <TableCell>
                        1
                    </TableCell>
                    <TableCell>
                        2
                    </TableCell>
                    <TableCell>
                        3
                    </TableCell>
                    <TableCell>
                        4
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>First</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
}