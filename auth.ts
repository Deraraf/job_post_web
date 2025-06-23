import nextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import github from "next-auth/providers/github";
import { prisma } from "@/lib/prisma";

export const { auth, handlers, signIn, signOut } = nextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [github],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
});
