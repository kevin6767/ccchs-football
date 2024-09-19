import connect from '../../../lib/mongodb'
import { revalidatePath } from 'next/cache'
import { ObjectId } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request) {
    const client = await connect
    const cursor = await client.db('ccchs-cubs').collection('attendance').find()
    const greetings = await cursor.toArray()
    revalidatePath('/attendance')
    return Response.json(greetings)
}

export async function POST(request) {
    const client = await connect
    const body = await request.json()
    await client.db('ccchs-cubs').collection('attendance').insertOne(body)
    return Response.json({ message: 'successfully updated the document' })
}

export async function DELETE(request) {
    const client = await connect
    const body = await request.json()
    await client
        .db('ccchs-cubs')
        .collection('attendance')
        .deleteOne(body.rosterId)
    return Response.json({ message: 'successfully updated the document' })
}

export async function PUT(request) {
    const client = await connect // Ensure you're waiting for the connection
    const body = await request.json()

    try {
        // Find the document that matches the rosterId
        const document = await client
            .db('ccchs-cubs')
            .collection('attendance')
            .findOne({ rosterId: body.rosterId })

        if (!document) {
            return new Response(
                JSON.stringify({ message: 'Document not found' }),
                { status: 404 },
            )
        }

        // Find the index of the record to update
        const index = document.attendanceRecord.findIndex(
            (record) =>
                record.rosterId === body.rosterId &&
                record.day === body.day &&
                record.month === body.month,
        )

        if (index === -1) {
            return new Response(
                JSON.stringify({
                    message: 'Record not found in attendanceRecord',
                }),
                { status: 404 },
            )
        }

        // Update the 'present' field at the correct index
        const result = await client
            .db('ccchs-cubs')
            .collection('attendance')
            .updateOne(
                {
                    'attendanceRecord.rosterId': body.rosterId,
                    [`attendanceRecord.${index}.day`]: body.day,
                    [`attendanceRecord.${index}.month`]: body.month,
                },
                {
                    $set: {
                        [`attendanceRecord.${index}.present`]: body.present,
                    },
                },
            )

        if (result.modifiedCount > 0) {
            return new Response(
                JSON.stringify({
                    message: 'Successfully updated the document',
                }),
                { status: 200 },
            )
        } else {
            return new Response(
                JSON.stringify({ message: 'No changes made' }),
                { status: 200 },
            )
        }
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
        })
    }
}
