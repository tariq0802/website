"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "./container";
import ToggleMenu from "./menu";
import UserMenu from "./user-menu";
import { LogIn } from "lucide-react";
import { Session } from "next-auth";
import { buttonVariants } from "./ui/button";

interface HeaderProps {
  session: Session | null;
}

const Header: React.FC<HeaderProps> = ({ session }) => {
  return (
    <Container>
      <div className="flex justify-between items-center">
        <Link href="/">
          <div className="relative h-[28px] w-[165px] md:h-[40px] md:w-[250px]">
            <Image alt="Logo" src="/images/logo1.png" fill />
          </div>
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

          <ToggleMenu />
        </div>
      </div>
    </Container>
  );
};
export default Header;
