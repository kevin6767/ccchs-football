'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/dist/server/api-utils"
import { v4 as uuidv4 } from 'uuid'

export async function createAttedanceRecord(player) {
    try {
       const response = await fetch('http://localhost:3000/api/attendance/', {
            method: 'POST',
            body: JSON.stringify(player),
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        })
        const rep = await response.json()
        revalidatePath('/attendance')
        return {status: 200, message: 'Sucessfully updated attedance!'}
    } catch (error) {
        redirect('/dashboard')
    }
}