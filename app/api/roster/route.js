import connect from '../../../lib/mongodb'
import { revalidatePath } from "next/cache"
import { ObjectId } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request) {
    const client = await connect
    const cursor = await client.db('ccchs-cubs').collection('roster').find()
    const greetings = await cursor.toArray()
    revalidatePath('/roster')
    return Response.json(greetings)
}

export async function POST(request){
  const client = await connect
  const body = await request.json()
  await client.db("ccchs-cubs").collection("roster").insertOne(body);
  return Response.json({message: "successfully updated the document", body:body})
}

export async function  DELETE (request) {
  const client = await connect
  const body = await request.json()
  await client.db("ccchs-cubs").collection("roster").deleteOne({rosterId: body})
  return Response.json({message: "successfully updated the document"})
}

export async function PUT(request) {
  const client = await connect;
  const body = await request.json();
  const id = new ObjectId(body._id);

  // Remove _id from body to prevent it from being updated
  delete body._id;


  try {
    const result = await client.db("ccchs-cubs").collection("roster").updateOne(
      { _id: id }, // Find document by _id
      { $set: body } // Update only fields in the body
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ message: "Document not found" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: "Successfully updated the document" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to update document", error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}