import connect from '../../../lib/mongodb'

export async function GET(request) {
    const client = await connect
    const cursor = await client.db('ccchs-cubs').collection('roster').find()
    const greetings = await cursor.toArray()
    return Response.json(greetings)
}

export async function POST(request){
  const client = await connect
  const body = await request.json()
  await client.db("ccchs-cubs").collection("roster").insertOne(body);
  return Response.json({message: "successfully updated the document"})
}

export async function  DELETE (request) {
  const client = await connect
  const body = await request.json()
  await client.db("ccchs-cubs").collection("roster").deleteOne(body._id)
  return Response.json({message: "successfully updated the document"})
}