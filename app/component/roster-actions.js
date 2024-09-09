'use client'

import { TextField, Box, Button } from '@mui/material'
import './roster-actions/styles/styles.css'
import { useState } from 'react'

export const RosterActions = () => {
    const [player, setPlayer] = useState({})

    const handleOnSubmit = (e) => {
        e.preventDefault()
        console.log(player)

        fetch('http://localhost:3000/api/roster/', {
            method: 'POST',
            body: JSON.stringify(player),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const handleOnChange = (e) => {
        const {name, value} = e.target

        setPlayer({
            ...player,
            [name]: value
        })
    }

    



    return (
        <Box 
        component='div'
        noValidate
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        className='form-container'>
        <form onSubmit={handleOnSubmit}>
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
        </form>

        </Box>
    )
}
