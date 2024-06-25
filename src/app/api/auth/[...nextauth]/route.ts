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
        return user;
      },
    }),
    GoogleProvider({
      clientId: (process.env.GOOGLE_CLIENT_ID as string) || "",
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET as string) || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (account?.provider === "credentials") {
        token.email = user?.email;
        token.username = user?.username;
        token.role = user?.role;
      }

      if (account?.provider === "google") {
        const data = {
          name: user.name,
          email: user.email,
          image: user.image,
          type: "google",
        };

        await LoginWithGoogle(
          data,
          (result: { status: boolean; user: any }) => {
            if (result.status) {
              token.email = result.user.email;
              token.name = result.user.name;
              token.role = result.user.role;
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

      if ("role" in session.user) {
        session.user.role = token.role;
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
