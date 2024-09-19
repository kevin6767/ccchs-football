'use client'
import { TextField, Box, MenuItem } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useEffect, useState } from 'react'
import { createPlayer } from '@/app/actions/roster-actions/roster-add/roster-add'
import { createAttedanceRecord } from '@/app/actions/attendance-actions/attedance-add/attedance-add'
import { generateWorkingDaysForYear } from '@/app/utils/generateWorkingDaysForYear'
import { validator } from './utils/validate'

const positions = [
    'Quarterback',
    'Running Back',
    'Wide Receiver',
    'Linebacker',
    'Offensive Lineman',
] // Example list

export const RosterAddorUpdate = ({
    handleClose,
    updatedPlayer,
    handleUpdate,
    setUpdatedPlayer,
    handleUpdateSubmit,
    update,
    roster,
}) => {
    const [player, setPlayer] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({}) // Error state to track field errors
    const [resp, setResp] = useState()

    const beforeHandleUpdate = async (e) => {
        e.preventDefault()
        const newErrors = validator.validate(update, player, roster)
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors) // Set errors if any
            return
        } else {
            setIsLoading(true)
            await handleUpdateSubmit()
            setIsLoading(false)
        }
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()

        const newErrors = validator.validate(update, player, roster)
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors) // Set errors if any
            return
        }

        setIsLoading(true)

        const response = await createPlayer(player).then(async (resp) => {
            const attendanceRecord = generateWorkingDaysForYear(
                resp.player.body.rosterId,
            )
            await createAttedanceRecord({
                rosterId: resp.player.body.rosterId,
                attendanceRecord: attendanceRecord,
            })
        })

        setIsLoading(false)
        handleClose()
        return
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target

        !update
            ? setPlayer({
                  ...player,
                  [name]: value,
              })
            : setUpdatedPlayer({
                  ...updatedPlayer,
                  [name]: value,
              })

        // Reset the error for the field that's being edited
        setErrors({
            ...errors,
            [name]: '',
        })
    }

    return (
        <Box
            component="div"
            noValidate
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            className="form-container"
        >
            <form onSubmit={update ? beforeHandleUpdate : handleOnSubmit}>
                <Box component="div">
                    <TextField
                        required
                        id="outlined-required"
                        label="First Name"
                        name="first_name"
                        error={!!errors.name || !!errors.first_name} // Set error state
                        helperText={
                            !errors.first_name ? errors.name : errors.first_name
                        } // Display error message
                        defaultValue={updatedPlayer?.first_name || ''}
                        onChange={handleOnChange}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Last Name"
                        name="last_name"
                        error={!!errors.name || !!errors.last_name}
                        helperText={
                            !errors.last_name ? errors.name : errors.last_name
                        }
                        defaultValue={updatedPlayer?.last_name || ''}
                        onChange={handleOnChange}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Number"
                        name="number"
                        type="number"
                        error={!!errors.number} // Set error state
                        helperText={errors.number} // Display error message
                        autoComplete="off"
                        defaultValue={updatedPlayer?.number || ''}
                        onChange={handleOnChange}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        select
                        label="Position"
                        name="position"
                        error={!!errors.position} // Set error state if needed
                        helperText={errors.position} // Display error message if needed
                        defaultValue={updatedPlayer?.position || ''}
                        onChange={handleOnChange}
                    >
                        {positions.map((position) => (
                            <MenuItem key={position} value={position}>
                                {position}
                            </MenuItem>
                        ))}
                    </TextField>
                    <LoadingButton type="submit" loading={isLoading}>
                        {update ? 'Update' : 'Submit'}
                    </LoadingButton>
                </Box>
            </form>
        </Box>
    )
}
