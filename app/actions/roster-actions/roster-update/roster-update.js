'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/dist/server/api-utils"


export async function updatePlayer(player) {
    console.log(player)
    try {
       const response = await fetch('http://localhost:3000/api/roster/', {
            method: 'PUT',
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
        return {status: 500, message: 'Failed updated roster!'}
    }
}