'use server'

import { redirect } from "next/dist/server/api-utils"


export async function createPlayer(player) {
    try {
       const response = await fetch('http://localhost:3000/api/roster/', {
            method: 'POST',
            body: JSON.stringify(player),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const rep = await response.json()
        return {status: 200, message: 'Sucessfully updated roster!'}
    } catch (error) {
        redirect('/dashboard')
    }
}