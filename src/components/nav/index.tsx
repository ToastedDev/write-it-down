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

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <nav className="p-3 border-b flex justify-between">
      <Link
        href="/"
        className="font-semibold flex gap-2 text-lg items-center hover:opacity-80"
      >
        <Image src="/logo.png" alt="Logo" width={35} height={35} />
        Write It Down!
      </Link>
      <div>
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
