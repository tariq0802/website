"use client";

import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import Link from "next/link";
import { Category } from "@prisma/client";
import React from "react";
import { Separator } from "./ui/separator";
import {
  ComponentBooleanIcon,
  ThickArrowRightIcon,
  ValueIcon,
} from "@radix-ui/react-icons";

interface ToogleMenuProps {
  categories: (Category & { children: Category[] | null })[];
}

const ToggleMenu: React.FC<ToogleMenuProps> = ({ categories }) => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="px-2 text-gray-800 hover:text-black focus:outline-none focus:ring-2 focus:ring-white"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Main Menu</SheetTitle>
            <SheetDescription>
              Go anywhere in this website with this map. Click end enjoy!
            </SheetDescription>
          </SheetHeader>

          <div className="my-8 h-[60vh] sm:h-[72vh] overflow-auto">
            {categories.map((item) => (
              <React.Fragment key={item.id}>
                {item.children?.length !== 0 ? (
                  <Accordion
                    type="single"
                    key={item.id}
                    collapsible
                    className="w-full bn border-0"
                  >
                    <AccordionItem value={item.id} className="border-0">
                      <AccordionTrigger
                        className={buttonVariants({
                          variant: "ghost",
                          className:
                            "hover:no-underline justify-between text-base border-0",
                        })}
                      >
                        <div className="flex items-center gap-4">
                          <ComponentBooleanIcon className="w-3 h-3 hover:text-rose-500" />
                          {item.label}
                        </div>
                      </AccordionTrigger>
                      {/* <Separator /> */}
                      <AccordionContent>
                        {item.children &&
                          item.children.map((x, index) => (
                            <Link key={index} href={`/${x.slug}`}>
                              <SheetClose
                                className={buttonVariants({
                                  variant: "ghost",
                                  className:
                                    "font-normal w-full justify-between pl-10",
                                })}
                              >
                                <div className="flex items-center gap-4">
                                  <ThickArrowRightIcon className="w-2 h-2 hover:text-rose-500" />
                                  <p>{x.label}</p>
                                </div>
                              </SheetClose>
                            </Link>
                          ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  !item.parentId &&
                  !item.children?.length && (
                    <Link key={item.id} href={`/${item.slug}`}>
                      <SheetClose
                        className={buttonVariants({
                          variant: "ghost",
                          className: "font-normal w-full justify-between bn",
                        })}
                      >
                        <div className="flex items-center gap-4">
                          <ValueIcon className="w-2 h-2 hover:text-rose-500" />
                          <p className="text-base">{item.label}</p>
                        </div>
                      </SheetClose>
                      {/* <Separator /> */}
                    </Link>
                  )
                )}
              </React.Fragment>
            ))}
          </div>

          <SheetFooter>
            <Button className="w-full">
              <LogOut className="w-5 h-4 mr-2" />
              Logout
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};
export default ToggleMenu;
