'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/dist/server/api-utils"

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
        return {status: 200, message: 'Sucessfully updated roster!'}
    } catch (error) {
        return {status: 500, message: 'Failed updated roster!'}
    }
}