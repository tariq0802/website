"use client";

import { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { LogOut } from "lucide-react";
import { User as userType } from "next-auth";
import { signOut } from "next-auth/react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { BoxIcon, PersonIcon } from "@radix-ui/react-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import Link from "next/link";

interface UserMenuProps {
  user: userType;
}

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Tags",
    href: "/dashboard/tags",
    description: "Description",
  },
  {
    title: "Categories",
    href: "/dashboard/categories",
    description: "Description",
  },
  {
    title: "Users",
    href: "/dashboard/users",
    description: "Description",
  },
  {
    title: "Authorities",
    href: "/dashboard/authorities",
    description: "Description",
  },
  {
    title: "Case Categories",
    href: "/dashboard/case-categories",
    description: "Description",
  },
  {
    title: "Articles",
    href: "/dashboard/articles",
    description: "Description",
  },
  {
    title: "Recruitments",
    href: "/dashboard/recruitments",
    description: "Description",
  },
  {
    title: "Cases",
    href: "/dashboard/cases",
    description: "Description",
  },
];

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="px-2 text-gray-800 hover:text-black focus:outline-none focus:ring-2 focus:ring-white"
          >
            <PersonIcon className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>User Menu</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you are done.
            </SheetDescription>
          </SheetHeader>

          <div className="my-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger
                  className={buttonVariants({
                    variant: "ghost",
                    className: "hover:no-underline justify-between",
                  })}
                >
                  Dashboard
                </AccordionTrigger>

                <AccordionContent>
                  {components.map((item, index) => (
                    <Link key={index} href={item.href}>
                      <SheetClose
                        className={buttonVariants({
                          variant: "ghost",
                          className: "font-normal w-full justify-between pl-8",
                        })}
                      >
                        <p>{item.title}</p>
                        {""}
                      </SheetClose>
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <SheetFooter>
            <Button
              onClick={(event) => {
                event.preventDefault();
                signOut({
                  callbackUrl: `${window.location.origin}/`,
                });
              }}
              variant="destructive"
              className="w-full"
            >
              <LogOut className="w-5 h-4 mr-2" />
              Logout
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default UserMenu;
