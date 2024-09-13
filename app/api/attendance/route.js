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