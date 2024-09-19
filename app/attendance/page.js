import { RosterAdd } from '../components/roster-add-or-update/roster-add-or-update'
import { TextField, Box, Button } from '@mui/material'
import { revalidatePath } from 'next/cache'
import { BasicTable } from '../components/table/table'
import { AttendanceTable } from './_components/attendanceTable'
import './styles/style.css'
import { GET } from '../api/roster/route'
import { GET as attendanceGet } from '../api/attendance/route'

export const revalidate = 2
//TODO: when refreshing after deleting, doesn't give correct roster amount
export default async function Page() {
    // TODO: Error handling
    let rosterData = await GET()
    let roster = await rosterData.json()
    let rosterAttendance = await attendanceGet()
    let attendance = await rosterAttendance.json()

    return (
        <div className="attendance-container">
            <Box className="attendance-box-container">
                <AttendanceTable roster={roster} attendance={attendance} />
            </Box>
        </div>
    )
}
