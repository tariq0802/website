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
      <div className="flex justify-center items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className={navigationMenuTriggerStyle()}
              >
                <HomeIcon className="h-4 w-4" />
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavMenu
              data={news}
              title="সমাচার সমাহার"
              slug="/news"
              label="সন্দেশ"
              description="description"
            />
            <NavMenu
              data={preparetion}
              title="গাইডেন্স সমগ্র"
              slug="/preparetion"
              label="গাইড"
              description="description"
            />
            <NavigationMenuItem>
              <Link href="/job-listings" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  কর্মতালিকা
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/case-listing" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  মামলা
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavMenu data={preparetion} label="আরও" />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </Container>
  );
};
export default NavBar;
