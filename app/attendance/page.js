import { RosterAdd } from '../components/roster-add-or-update/roster-add-or-update'
import { TextField, Box, Button } from '@mui/material'
import { revalidatePath } from "next/cache"
import { BasicTable } from '../components/table/table'
import { AttendanceTable } from './_components/attendanceTable'
import './styles/style.css'


export const revalidate = 2
//TODO: when refreshing after deleting, doesn't give correct roster amount
export default async function Page() {
    // TODO: Error handling
    let data = await fetch('http://localhost:3000/api/roster/')
    let roster = await data.json()


    return <div className='attendance-container'>
        <AttendanceTable roster ={roster} />
    </div>
}