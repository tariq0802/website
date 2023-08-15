"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "./container";
import ToggleMenu from "./menu";
import UserMenu from "./user-menu";
import { LogIn } from "lucide-react";
import { Session } from "next-auth";
import { buttonVariants } from "./ui/button";
import { Category } from "@prisma/client";

interface HeaderProps {
  session: Session | null;
  categories: (Category & { children: Category[] | null })[];
}

const Header: React.FC<HeaderProps> = ({ session, categories }) => {
  return (
    <Container>
      <div className="flex justify-between items-center">
        <Link href="/">
          <Image alt="Logo" src="/images/logo2.svg" height={10} width={120} />
        </Link>

        <div className="flex items-center">
          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <Link
              href="/sign-in"
              className={
                (buttonVariants({ variant: "ghost" }),
                "p-2 rounded text-gray-800 hover:text-black hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white")
              }
            >
              <LogIn className="h-4 w-5" />
            </Link>
          )}

          <ToggleMenu categories={categories} />
        </div>
      </div>
    </Container>
  );
};
export default Header;
