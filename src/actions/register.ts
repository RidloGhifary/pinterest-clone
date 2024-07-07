"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { getUserByEmail } from "@/data/user";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
// import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, username, password } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      name: username,
      email,
      password: hashedPassword,
    },
  });

  // TODO : SEND VERIFICATION EMAIL
  // const verificationToken = await generateVerificationToken(email);
  // await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
};
