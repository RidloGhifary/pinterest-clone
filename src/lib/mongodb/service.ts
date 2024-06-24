import clientPromise from "./connect";

export default async function GetContents() {
  try {
    const client = await clientPromise;
    const db = client.db("web");

    const contents = await db.collection("contents").find({}).toArray();

    return contents;
  } catch (e) {
    console.error(e);
  }
}
