"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password, code } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  // if (!existingUser.emailVerified) {
  //   const verificationToken = await generateVerificationToken(
  //     existingUser.email,
  //   );

  //   await sendVerificationEmail(
  //     verificationToken.email,
  //     verificationToken.token,
  //   );

  //   return { success: "Confirmation email sent!" };
  // }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || "/",
    });

    return { success: "Login success" };
  } catch (error) {
    if (error instanceof AuthError) {
      console.log("🚀 ~ error:", error);
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
};
