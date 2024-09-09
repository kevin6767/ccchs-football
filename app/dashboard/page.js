import { RosterAdd } from '../component/roster-add/roster-add'
import { TextField, Box, Button } from '@mui/material'
import './styles/style.css'
import { BasicTable } from '../component/table/table'

export default function Page() {
    return <div className='dashboard-container'>
            <Box component='div' className='dashboard-box-container'>
                <BasicTable />
            </Box>
        </div>
}