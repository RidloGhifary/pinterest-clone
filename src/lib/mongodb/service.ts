"use server";

import clientPromise from "./connect";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { cookies } from "next/headers";

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

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: parseInt(process.env.MAILTRAP_PORT as string),
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

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
    const otpCode = Math.floor(1000 + Math.random() * 9000);

    await db.collection("users").insertOne({
      username,
      email,
      profile_picture: "",
      password: hashedPassword,
      type: "email",
      createdAt: new Date(),
      updatedAt: new Date(),
      verified: false,
      otpCode,
    });

    cookies().set("user", email, { secure: true });

    await transporter.sendMail({
      from: '"Pinterest Clone" <mailtrap@demomailtrap.com>',
      to: email,
      subject: "OTP Code",
      text: `Your OTP code is ${otpCode}`,
      html: `<p>Your OTP code is <strong>${otpCode}</strong></p>`,
    });

    return {
      status: 200,
      error: false,
      message: "success",
      email,
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

export async function Login(data: { email: string; password: string }) {
  const client = clientPromise;
  const db = client.db("web");
  const { email, password } = data;

  // TODO Check if the user already exists
  const existingUser = await db.collection("users").findOne({ email });

  if (!existingUser) {
    return null;
  }

  if (!existingUser.verified) {
    return null;
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    return null;
  }

  return existingUser;
}

export async function VerifyOtp(data: { otpCode: string; userEmail: string }) {
  try {
    const client = clientPromise;
    const db = client.db("web");
    const { otpCode, userEmail } = data;

    // Check if the user already exists
    const existingUser = await db
      .collection("users")
      .findOne({ $and: [{ email: userEmail }, { otpCode: otpCode }] });

    if (!existingUser) {
      return {
        status: 400,
        error: true,
        message: "Invalid OTP code",
      };
    }

    if (existingUser.verified) {
      return {
        status: 400,
        error: true,
        message: "User already verified",
      };
    }

    await db
      .collection("users")
      .updateOne(
        { email: existingUser.email },
        { $set: { verified: true, otpCode: null } },
      );

    cookies().delete("user");

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

export async function LoginWithGoogle(data: any, callback: any) {
  const client = clientPromise;
  const db = client.db("web");

  const user = await db.collection("users").findOne({ email: data.email });

  if (user) {
    await db
      .collection("users")
      .updateOne(
        { email: data.email, username: data.name },
        { $set: { type: data.type, updatedAt: new Date() } },
      );

    return callback({ status: true, user });
  }

  await db.collection("users").insertOne({
    username: data.name,
    email: data.email,
    profile_picture: data.image,
    type: data.type,
    createdAt: new Date(),
    updatedAt: new Date(),
    verified: true,
    otpCode: null,
  });

  return callback({ status: true, user });
}
