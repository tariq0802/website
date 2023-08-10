"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "./container";
import ToggleMenu from "./menu";
import UserMenu from "./user-menu";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { LogIn } from "lucide-react";
import { HomeIcon } from "@radix-ui/react-icons";
import { Session } from "next-auth";
import { buttonVariants } from "./ui/button";
import { Category } from "@prisma/client";
import NavMenu from "./nav-menu";

interface NavbarProps {
  news: Category[];
  preparetion: Category[];
}

const NavBar: React.FC<NavbarProps> = ({ news, preparetion }) => {
  return (
      <Container>
        nav
      </Container>
    // <div className="fixed w-full bg-cyan-100 z-10 shadow-sm">
    //   <div className="flex flex-col">
    //     <Container>
    //       <div className="flex flex-row md:py-4 py-2 items-center justify-between gap-3 md:gap-0">
    //         <Link href={"/"}>
    //           <div className="">
    //             <Image
    //               className="rounded-full block md:hidden"
    //               alt="Avatar"
    //               height="35"
    //               width="35"
    //               src="/images/logo.png"
    //               priority
    //             />
    //           </div>
    //           <Image
    //             alt="Logo"
    //             className="hidden md:block cursor-pointer"
    //             height="100"
    //             width="200"
    //             src="/images/logo1.png"
    //             priority
    //           />
    //         </Link>

    //         <div className="flex items-center">
    //           {session?.user ? (
    //             <UserMenu user={session.user} />
    //           ) : (
    //             <Link
    //               href="/sign-in"
    //               className={
    //                 (buttonVariants({ variant: "ghost" }),
    //                 "p-2 rounded text-gray-800 hover:text-black hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white")
    //               }
    //             >
    //               <LogIn className="h-4 w-5" />
    //             </Link>
    //           )}

    //           <ToggleMenu />
    //         </div>
    //       </div>
    //     </Container>

    //     <div className="flex flex-row justify-center items-center bg-slate-800 text-slate-100 text-sm">
    //       <NavigationMenu>
    //         <NavigationMenuList>
    //           <NavigationMenuItem>
    //             <Link href="/" legacyBehavior passHref>
    //               <NavigationMenuLink className={navigationMenuTriggerStyle()}>
    //                 <HomeIcon className="h-4 w-4" />
    //               </NavigationMenuLink>
    //             </Link>
    //           </NavigationMenuItem>

    //           <NavMenu
    //             data={news}
    //             title="সমাচার সমাহার"
    //             slug="/news"
    //             label="সন্দেশ"
    //             description="description"
    //           />
    //           <NavMenu
    //             data={preparetion}
    //             title="গাইডেন্স সমগ্র"
    //             slug="/preparetion"
    //             label="গাইড"
    //             description="description"
    //           />
    //           <NavigationMenuItem>
    //             <Link href="/job-listings" legacyBehavior passHref>
    //               <NavigationMenuLink className={navigationMenuTriggerStyle()}>
    //                 কর্মতালিকা
    //               </NavigationMenuLink>
    //             </Link>
    //           </NavigationMenuItem>
    //           <NavigationMenuItem>
    //             <Link href="/case-listing" legacyBehavior passHref>
    //               <NavigationMenuLink className={navigationMenuTriggerStyle()}>
    //                 মামলা
    //               </NavigationMenuLink>
    //             </Link>
    //           </NavigationMenuItem>
    //           <NavMenu data={preparetion} label="আরও" />
    //         </NavigationMenuList>
    //       </NavigationMenu>
    //     </div>
    //   </div>
    // </div>
  );
};
export default NavBar;
