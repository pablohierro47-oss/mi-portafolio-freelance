import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        username: { label: "Usuario", type: "text", placeholder: "admin" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const adminCount = await prisma.admin.count();
        if (adminCount === 0) {
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const newAdmin = await prisma.admin.create({
            data: { username: credentials.username, password: hashedPassword },
          });
          return { id: newAdmin.id, name: newAdmin.username };
        }

        const admin = await prisma.admin.findUnique({
          where: { username: credentials.username },
        });

        if (!admin) return null;

        const isPasswordValid = await bcrypt.compare(credentials.password, admin.password);
        if (!isPasswordValid) return null;

        return { id: admin.id, name: admin.username };
      }
    })
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};