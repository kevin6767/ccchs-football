'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/dist/server/api-utils"
import {eventLogger} from '../../../utils/event-logger/event-logger'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
export async function updatePlayer(player) {
    try {
       const response = await fetch(`${apiBaseUrl}/api/roster/`, {
            method: 'PUT',
            body: JSON.stringify(player),
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        })
        const rep = await response.json()
        revalidatePath('/roster')
        eventLogger.logEvent({message: 'Successfully updated player'})
        return {status: 200, message: 'Sucessfully updated player!'}
    } catch (error) {
        return {status: 500, message: 'Failed updated player!'}
    }
}