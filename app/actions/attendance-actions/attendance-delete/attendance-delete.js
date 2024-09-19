'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/dist/server/api-utils"
import {eventLogger} from '../../../utils/event-logger/event-logger'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export async function deleteAttendanceRecord(player) {
    try {
       const response = await fetch(`${apiBaseUrl}/api/attendance/`, {
            method: 'DELETE',
            body: JSON.stringify(player),
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        })
        const rep = await response.json()
        revalidatePath('/attendance')
        eventLogger.logEvent({message: 'Successfully updated attendance'})
        return {status: 200, message: 'Sucessfully updated attendance!'}
    } catch (error) {
        redirect('/dashboard')
    }
}