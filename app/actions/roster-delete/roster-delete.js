'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/dist/server/api-utils"


export async function deletePlayer(player) {
    try {
       const response = await fetch('http://localhost:3000/api/roster/', {
            method: 'DELETE',
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