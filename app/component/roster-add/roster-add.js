'use client'
import { TextField, Box, Button } from '@mui/material'
import './styles/styles.css'
import { useState } from 'react'
import { createPlayer } from '@/app/actions/roster-actions/roster-add'

export const RosterAdd = ({handleClose}) => {
    const [player, setPlayer] = useState({})
    const [resp, setResp] = useState()

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        console.log(player)
        
        const response = await createPlayer(player)
        if (!handleClose) () => { 
            setResp(response)
            return
        }
        handleClose()
        return 
    }

    const handleOnChange = (e) => {
        const {name, value} = e.target

        setPlayer({
            ...player,
            [name]: value
        })
    }

    



    return <Box 
        component='div'
        noValidate
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        className='form-container'>
        {!resp ? <form onSubmit={handleOnSubmit}>
        <Box component='div'>
        <TextField
          required
          id="outlined-required"
          label="First Name"
          name="first_name"
          onChange={handleOnChange}
        />
        <TextField
          required
          id="outlined-required"
          label="last Name"
          onChange={handleOnChange}
            name="Last_name"
        />
        <TextField
          required
          id="outlined-required"
          label="Number"
          name="number"
          type="number"
          onChange={handleOnChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Position"
          name="position"
          onChange={handleOnChange}
        />
        <Button type="submit">
            Submit
        </Button>
        </Box>
        </form> : resp.message}

        </Box>
    
}
