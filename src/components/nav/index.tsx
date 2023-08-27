import Image from "next/image";
import Link from "next/link";
import { getCurrentUser } from "~/server/auth";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogoutText } from "./logout";
import ThemeDropdown from "./themes";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <nav className="flex justify-between border-b px-4 py-3">
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-semibold hover:opacity-80"
      >
        <Image
          src="/logo.png"
          alt="Logo"
          width={35}
          height={35}
          className="dark:invert"
        />
        Write It Down!
      </Link>
      <div className="flex items-center gap-2">
        <ThemeDropdown />
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src={user.image!}
                alt={user.id}
                width={35}
                height={35}
                className="rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-3">
              <DropdownMenuGroup>
                <DropdownMenuItem className="hover:cursor-pointer" asChild>
                  <Link href="/settings">Manage account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:cursor-pointer">
                  <LogoutText />
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
