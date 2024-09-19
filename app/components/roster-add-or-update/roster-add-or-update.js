'use client'
import { TextField, Box } from '@mui/material'
import {LoadingButton} from '@mui/lab'
import './styles/styles.css'
import { useEffect, useState } from 'react'
import { createPlayer } from '@/app/actions/roster-actions/roster-add/roster-add'
import { createAttedanceRecord } from '@/app/actions/attendance-actions/attedance-add/attedance-add'
import { generateWorkingDaysForYear } from '@/app/utils/generateWorkingDaysForYear'

export const RosterAddorUpdate = ({handleClose, updatedPlayer, handleUpdate, setUpdatedPlayer, handleUpdateSubmit, update}) => {
    const [player, setPlayer] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [resp, setResp] = useState()
  

    const handleOnSubmit = async (e) => {
      setIsLoading(true)
        e.preventDefault()
        
        const response = await createPlayer(player).then(async resp => {
          const attendanceRecord = generateWorkingDaysForYear(resp.player.body.rosterId)
          await createAttedanceRecord({
            rosterId: resp.player.body.rosterId,
            attendanceRecord: attendanceRecord
          })
        })
        if (!handleClose) () => { 
            setResp(response)
            return
        }
        setIsLoading(false)
        handleClose()
        return 
    }

    const handleOnChange = (e) => {
        const {name, value} = e.target

        !update ? setPlayer({
            ...player,
            [name]: value
        }) : setUpdatedPlayer({
          ...updatedPlayer,
          [name]: value
      })
    }

    return <Box 
        component='div'
        noValidate
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        className='form-container'>
        {!resp ? <form onSubmit={!update ? handleOnSubmit : handleUpdateSubmit}>
        <Box component='div'>
        <TextField
          required
          id="outlined-required"
          label="First Name"
          name="first_name"
          defaultValue={updatedPlayer?.first_name ||''}
          onChange={handleOnChange}
        />
        <TextField
          required
          id="outlined-required"
          label="last Name"
          defaultValue={updatedPlayer?.last_name || ''}
          onChange={handleOnChange}
            name="last_name"
        />
        <TextField
          required
          id="outlined-required"
          label="Number"
          name="number"
          type="number"
          defaultValue={updatedPlayer?.number || ''}
          onChange={handleOnChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Position"
          name="position"
          defaultValue={updatedPlayer?.position || ''}
          onChange={handleOnChange}
        />
        <LoadingButton type="submit" loading={isLoading}>
            {update ? 'Update' : 'Submit'}
        </LoadingButton>
        </Box>
        </form> : resp.message}

        </Box>
    
}
