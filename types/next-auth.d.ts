import { DefaultSession } from 'next-auth';
import { Role } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: Role;
      empId?: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    role: Role;
    empId?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: Role;
    empId?: string;
  }
}
