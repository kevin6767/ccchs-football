'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/dist/server/api-utils'
import { v4 as uuidv4 } from 'uuid'
import { eventLogger } from '../../../utils/event-logger/event-logger'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
export async function updateAttendanceRecord(player) {
    try {
        const response = await fetch(`${apiBaseUrl}/api/attendance/`, {
            method: 'PUT',
            body: JSON.stringify(player),
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        })
        const rep = await response.json()
        revalidatePath('/attendance')
        eventLogger.logEvent({
            message: 'Successfully updated attendance record',
        })
        return {
            status: rep.status,
            message: 'Sucessfully updated attedance record!',
        }
    } catch (error) {
        redirect('/dashboard')
    }
}
