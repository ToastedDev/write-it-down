"use client";

import { useTheme } from "next-themes";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function ThemeDropdown() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-[35px] w-[35px]">
          <Icons.Sun className="h-5 w-5 rotate-0 scale-100 dark:hidden" />
          <Icons.Moon className="hidden h-5 w-5 rotate-0 scale-100 dark:block" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <button
            className="h-full w-full text-left"
            onClick={() => setTheme("light")}
          >
            Light
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            className="h-full w-full text-left"
            onClick={() => setTheme("dark")}
          >
            Dark
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            className="h-full w-full text-left"
            onClick={() => setTheme("system")}
          >
            System
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
