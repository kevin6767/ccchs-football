'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/dist/server/api-utils"
import { v4 as uuidv4 } from 'uuid'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export async function createPlayer(player) {
    // TODO: better error handling
    const id = uuidv4()
    console.log(id)
    player['rosterId'] = id
    try {
       const response = await fetch(`http://${apiBaseUrl}/api/roster/`, {
            method: 'POST',
            body: JSON.stringify(player),
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        })
        const rep = await response.json()
        revalidatePath('/roster')
        return {status: 200, message: 'Sucessfully updated roster!', player: rep}
    } catch (error) {
        redirect('/dashboard')
    }
}