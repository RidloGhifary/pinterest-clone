import NextAuth from "next-auth";
import { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

// import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";
import { getUserById } from "./data/user";
import authConfig from "./auth.config";
import { db } from "./lib/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user?.id as string);

      // Prevent signIn without email verification
      // if (!existingUser?.emailVerified) return false;

      // TODO : add 2FA check
      // if (existingUser?.isTwoFactorEnabled) {
      //   const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
      //     existingUser.id,
      //   );

      //   if (!twoFactorConfirmation) return false;

      //   // Delete two factor confirmation for next sign in
      //   await db.twoFactorConfirmation.delete({
      //     where: { id: twoFactorConfirmation.id },
      //   });
      // }

      return true;
    },

    async session({ token, session }) {
      console.log("🚀 ~ session ~ session:", session);
      console.log("🚀 ~ session ~ token:", token);
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
