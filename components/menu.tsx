"use client";

import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
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

const ToggleMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [subMenu, setSubMenu] = useState(false);
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

          <div className="my-8">Home</div>

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
