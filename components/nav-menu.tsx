"use client";

import { Category } from "@prisma/client";
import { Icons } from "./icons";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { ListItem } from "./list-item";

interface NavMenuProps {
  label: string;
  title?: string;
  slug?: string;
  description?: string;
  data: Category[];
}

const NavMenu: React.FC<NavMenuProps> = ({
  label,
  title,
  description,
  data,
  slug,
}) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-transparent rounded-none px-2 md:text-md">
        {label}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="">
        <ul className="grid w-[355px] p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] right-0 gap-4">
          {title && description && slug && (
            <li className="row-span-3 mb-2">
              <NavigationMenuLink asChild>
                <a
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md"
                  href={slug}
                >
                  <div className="flex gap-10 items-center">
                    <Icons.logo className="h-10 w-10" />
                    <div className="text-base font-semibold md:text-lg ">
                      {title}
                      <p className="text-xs leading-tight text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  </div>
                </a>
              </NavigationMenuLink>
            </li>
          )}
          {data.map((item) => (
            <ListItem
              key={item.id}
              href={`/news/${item.slug}`}
              title={item.label}
            >
              <span className="text-xs">{item.description}</span>
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default NavMenu;
