'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/dist/server/api-utils"
import { v4 as uuidv4 } from 'uuid'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
export async function updateAttendanceRecord(player) {
    try {
       const response = await fetch(`${apiBaseUrl}/api/attendance/`, {
            method: 'PUT',
            body: JSON.stringify(player),
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        })
        const rep = await response.json()
        revalidatePath('/attendance')
        return {status: 200, message: 'Sucessfully updated attedance record!'}
    } catch (error) {
        redirect('/dashboard')
    }
}