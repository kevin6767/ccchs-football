'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/dist/server/api-utils'
import { eventLogger } from '../../../utils/event-logger/event-logger'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export async function deletePlayer(player) {
    try {
        const response = await fetch(`${apiBaseUrl}/api/roster/`, {
            method: 'DELETE',
            body: JSON.stringify(player),
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        })
        const rep = await response.json()
        revalidatePath('/roster')
        eventLogger.logEvent({ message: 'Successfully deleted player' })
        return { status: 200, message: 'Sucessfully deleted player!', rep: rep }
    } catch (error) {
        redirect('/dashboard')
    }
}
