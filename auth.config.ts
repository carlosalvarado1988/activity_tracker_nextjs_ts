import type { NextAuthConfig } from "next-auth";
import prisma from "@/prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export default {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email as string },
        });
        if (!user) return null;
        const bcrypt = require("bcrypt");
        const passwordsMatched = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword!
        );
        return passwordsMatched ? user : null;
      },
    }),
  ],
} satisfies NextAuthConfig;
