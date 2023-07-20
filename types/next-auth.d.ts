import { Role } from "@prisma/client";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type userId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: userId;
    role: Role;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: userId;
      role: Role;
    };
  }
}
