"use client";

import Link from "next/link";
import Container from "./container";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { HomeIcon } from "@radix-ui/react-icons";
import { Category } from "@prisma/client";
import NavMenu from "./nav-menu";

interface NavbarProps {
  news: Category[];
  preparetion: Category[];
  lawsuit: Category[]
}

const more = [
  {
    id: "cll2okjsy000frv4frqlubv0o",
    label: "Contact",
    title: "contact",
    slug: "contact",
    description: "description",
    createdAt: new Date("2023-08-08T19:14:15.275Z"),
    image:
      "https://cgwebsite.s3.ap-south-1.amazonaws.com/images/0064743c-5ffc-488b-a88a-e03e731daa39.jpeg",
    parentId: null,
    parent: null,
  },
  {
    id: "cll2ok32o000erv4fl8egljtp",
    label: "About Us",
    title: "about us",
    slug: "about-us",
    description: "description",
    createdAt: new Date("2023-08-08T19:14:15.275Z"),
    image:
      "https://cgwebsite.s3.ap-south-1.amazonaws.com/images/0064743c-5ffc-488b-a88a-e03e731daa39.jpeg",
    parentId: null,
    parent: null,
  },
];

const NavBar: React.FC<NavbarProps> = ({ news, preparetion, lawsuit }) => {
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
              label="গাইডেন্স"
              description="description"
            />
            <NavMenu
              data={lawsuit}
              title="মামলা মোকদ্দমা"
              slug="/lawsuit"
              label="আদালত"
              description="description"
            />
            <NavigationMenuItem>
              <Link href="/job-listings" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  নিয়োগ
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavMenu data={more} label="অন্যান্য" />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </Container>
  );
};
export default NavBar;
