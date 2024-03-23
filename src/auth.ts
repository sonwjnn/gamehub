import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import userApi from "./services/api/modules/user-api";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      // await db.user.update({
      //   where: { id: user.id },
      //   data: {
      //     emailVerified: new Date(),
      //   },
      // });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }

      if (!user?.id) {
        return false;
      }

      const existingUser = await userApi.getUserById({ userId: user.id });

      if (!existingUser) return false;

      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.username = token.username as string;
        session.user.image = token.image as string;
        session.user.email = token.email as string;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await userApi.getUserById({
        userId: token.sub,
      });

      if (!existingUser) return token;

      token.username = existingUser.data.username;
      token.image = existingUser.image;
      token.email = existingUser.email;

      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
