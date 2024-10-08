'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/dist/server/api-utils'
import { v4 as uuidv4 } from 'uuid'
import { eventLogger } from '../../../utils/event-logger/event-logger'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
export async function createAttedanceRecord(player) {
    try {
        const response = await fetch(`${apiBaseUrl}/api/attendance/`, {
            method: 'POST',
            body: JSON.stringify(player),
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        })
        const rep = await response.json()
        revalidatePath('/attendance')
        eventLogger.logEvent({
            message: 'Successfully created attendance record',
        })
        return {
            status: 200,
            message: 'Sucessfully created attendance record!',
        }
    } catch (error) {
        eventLogger.logEvent({ message: 'Failed to created attendance record' })
        redirect('/dashboard')
    }
}
