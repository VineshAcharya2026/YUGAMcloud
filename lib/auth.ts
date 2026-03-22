import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'yugamcloud-hrm-secret-super-secure-key',
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
            include: { employee: true },
          });
          if (!user) return null;
          
          const valid = await bcrypt.compare(credentials.password as string, user.password);
          if (!valid) return null;
          
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            empId: user.employee?.empId,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null; // prevents "Configuration" generic error bleeding to UI
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) { 
        token.role = (user as any).role; 
        token.empId = (user as any).empId; 
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).empId = token.empId;
      }
      return session;
    },
  },
  pages: { signIn: '/login' },
});
