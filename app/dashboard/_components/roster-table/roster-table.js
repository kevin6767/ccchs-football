'use client'

import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button, Box, TableSortLabel } from '@mui/material'
import { useState } from 'react'
import { RosterActionsModal } from '../roster-actions-modal/roster-actions-modal'
import { deletePlayer } from '@/app/actions/roster-actions/roster-delete/roster-delete'
import { updatePlayer } from '@/app/actions/roster-actions/roster-update/roster-update'
import { deleteAttendanceRecord } from '@/app/actions/attendance-actions/attendance-delete/attendance-delete'

export const RosterTable = ({ row }) => {
    const [updatedPlayer, setUpdatedPlayer] = useState(undefined)
    const [update, setUpdateMode] = useState(false)
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
        setUpdatedPlayer(undefined)
        setUpdateMode(false)
    }
    const handleClose = () => setOpen(false)

    const handleDelete = async (id) => {
        // TODO: do error handling
        const deleteResp = await deletePlayer(id)
        const deleteAttendance = await deleteAttendanceRecord(id)
    }

    const handleUpdate = async (row) => {
        setUpdatedPlayer(row)
        setOpen(true)
        setUpdateMode(true)
    }

    const handleUpdateSubmit = async () => {
        const updateResp = await updatePlayer(updatedPlayer)
        handleClose()
        setUpdatedPlayer(undefined)
    }

    return (
        <>
            <TableContainer component={Paper} elevation={5}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button sx={{ padding: '10px' }} onClick={handleOpen}>
                        Add New Player
                    </Button>
                </Box>
                <Table sx={{ minWidth: 1300 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel>First Name</TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel>Last Name</TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel>Number</TableSortLabel>
                            </TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>
                                <TableSortLabel>Squat</TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel>Bench</TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel>Power Clean</TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel>Deadlift</TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel>Weight</TableSortLabel>
                            </TableCell>
                            <TableCell />
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row.map((row) => (
                            <TableRow key={row.rosterId}>
                                <TableCell>{row.first_name}</TableCell>
                                <TableCell>{row.last_name}</TableCell>
                                <TableCell>{row.number}</TableCell>
                                <TableCell>{row.position}</TableCell>
                                <TableCell>{row.squat_max}</TableCell>
                                <TableCell>{row.bench_max}</TableCell>
                                <TableCell>{row.powerclean_max}</TableCell>
                                <TableCell>{row.deadlift_max}</TableCell>
                                <TableCell>{row.weight}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() =>
                                            handleDelete(row.rosterId)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => handleUpdate(row)}>
                                        Update
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <RosterActionsModal
                update={update}
                handleUpdateSubmit={handleUpdateSubmit}
                setUpdatedPlayer={setUpdatedPlayer}
                handleUpdate={handleUpdate}
                updatedPlayer={updatedPlayer}
                roster={row}
                {...{
                    open,
                    handleClose,
                }}
            />
        </>
    )
}
