import { getServerSession } from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import {
  getMockUserByEmail,
  getMockUserById,
} from "@/lib/mockService";
import type { User } from "@/types";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Demo Account",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        if (!email) {
          return null;
        }

        const user = await getMockUserByEmail(email);
        if (!user) {
          return null;
        }

        const authorizedUser = {
          id: user.id,
          email: user.email,
          name: user.username,
          username: user.username,
          image: user.avatar,
        };

        return authorizedUser;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const sessionUser = user as {
          id: string;
          username?: string | null;
          name?: string | null;
          image?: string | null;
        };

        token.id = sessionUser.id;
        token.username = sessionUser.username ?? sessionUser.name ?? token.username;
        if (sessionUser.image) {
          token.picture = sessionUser.image;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = (token.username as string) ?? session.user.name;
        if (token.picture) {
          session.user.image = token.picture as string;
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET ?? "pages-dev-secret",
};

export const getCurrentUser = async (): Promise<User | null> => {
  const session = await getServerSession(authOptions);

  if (session?.user?.id) {
    const user = await getMockUserById(session.user.id);
    if (user) {
      return user;
    }
  }

  return null;
};

export const getDemoUser = async (): Promise<User> => {
  const fallback = await getMockUserById("user_alex");
  if (!fallback) {
    throw new Error("Demo user not found in mock data");
  }

  return fallback;
};
