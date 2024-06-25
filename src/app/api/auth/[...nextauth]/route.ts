import { Login, LoginWithGoogle } from "@/lib/mongodb/service";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user: any = await Login({ email, password });
        if (user) return user;
        else return null;
      },
    }),
    GoogleProvider({
      clientId: (process.env.GOOGLE_CLIENT_ID as string) || "",
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET as string) || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: any) {
      // console.log("🚀 ~ jwt ~ user:", user);
      if (user && account?.provider === "credentials") {
        token.email = user?.email;
        token.username = user?.username;
      }

      if (account?.provider === "google") {
        const data = {
          username: user.username,
          email: user.email,
          image: user.image,
          type: "google",
        };

        await LoginWithGoogle(
          data,
          (result: { status: boolean; user: any }) => {
            if (result.status) {
              token.email = result.user.email;
              token.username = result.user.username;
            }
          },
        );
      }

      return token;
    },

    async session({ session, token }: any) {
      if ("email" in session.user) {
        session.user.email = token.email;
      }

      if ("username" in session.user) {
        session.user.username = token.username;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
