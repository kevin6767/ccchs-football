import { RosterAdd } from '../component/roster-add/roster-add'
import { TextField, Box, Button } from '@mui/material'
import './styles/style.css'
import { BasicTable } from '../component/table/table'


export const revalidate = 5

export default async function Page() {
    let data = await fetch('http://localhost:3000/api/roster/')
    let roster = await data.json()
    return <div className='dashboard-container'>
            <Box component='div' className='dashboard-box-container'>
                <BasicTable row={roster} />
            </Box>
        </div>
}