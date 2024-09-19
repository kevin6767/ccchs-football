import { RosterAdd } from '../components/roster-add-or-update/roster-add-or-update'
import { TextField, Box, Button } from '@mui/material'
import './styles/style.css'
import { revalidatePath } from 'next/cache'
import { BasicTable } from '../components/table/table'
import { GET } from '../api/roster/route'

export const revalidate = 2
//TODO: when refreshing after deleting, doesn't give correct roster amount
export default async function Page() {
    // TODO: Error handling
    let data = await GET()
    let roster = await data.json()

    return (
        <div className="dashboard-container">
            <Box component="div" className="dashboard-box-container">
                <BasicTable row={roster} />
            </Box>
        </div>
    )
}
