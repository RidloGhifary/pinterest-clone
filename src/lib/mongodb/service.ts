import clientPromise from "./connect";
import bcrypt from "bcryptjs";

export async function GetContents() {
  try {
    const client = clientPromise;
    const db = client.db("web");

    const contents = await db.collection("contents").find({}).toArray();

    return contents;
  } catch (e) {
    console.error(e);
  }
}

export async function Register(data: {
  username: string;
  email: string;
  password: string;
}) {
  try {
    const client = clientPromise;
    const db = client.db("web");
    const { username, email, password } = data;

    // Check if the user already exists
    const existingUser = await db.collection("users").findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (existingUser) {
      return {
        status: 409,
        error: true,
        message: "User already exist",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection("users").insertOne({
      username,
      email,
      profile_picture: "",
      password: hashedPassword,
      type: "email",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      status: 200,
      error: false,
      message: "success",
    };
  } catch (e) {
    console.error(e);
    return {
      status: 500,
      error: false,
      message: "Unable to register user",
    };
  }
}
