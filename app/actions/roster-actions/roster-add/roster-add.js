'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/dist/server/api-utils"
import { v4 as uuidv4 } from 'uuid'

export async function createPlayer(player) {
    // TODO: better error handling
    const id = uuidv4()
    console.log(id)
    player['rosterId'] = id
    try {
       const response = await fetch('http://localhost:3000/api/roster/', {
            method: 'POST',
            body: JSON.stringify(player),
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        })
        const rep = await response.json()
        revalidatePath('/roster')
        return {status: 200, message: 'Sucessfully updated roster!'}
    } catch (error) {
        redirect('/dashboard')
    }
}