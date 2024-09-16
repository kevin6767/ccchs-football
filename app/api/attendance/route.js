import connect from '../../../lib/mongodb'
import { revalidatePath } from "next/cache"
import { ObjectId } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request) {
    const client = await connect
    const cursor = await client.db('ccchs-cubs').collection('attendance').find()
    const greetings = await cursor.toArray()
    revalidatePath('/attendance')
    return Response.json(greetings)
}

export async function POST(request){
  const client = await connect
  const body = await request.json()
  await client.db("ccchs-cubs").collection("attendance").insertOne(body);
  return Response.json({message: "successfully updated the document"})
}

export async function PUT(request) {
  const client = await connect;  // Ensure you're waiting for the connection
  const body = await request.json();

  try {
    const result = await client.db("ccchs-cubs")
      .collection("attendance")
      .findOneAndUpdate(
        { "attendanceRecord.rosterId": body.rosterId },  // Find document where an object inside attendanceRecord array has the matching rosterId
        { $set: { "attendanceRecord.$.present": body.present } },  // Update the 'present' field of the matched object
      );

    if (result.value) {
      return new Response(JSON.stringify({ message: "Successfully updated the document", result: result.value }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: "Document not found" }), { status: 404 });
    }

  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}

