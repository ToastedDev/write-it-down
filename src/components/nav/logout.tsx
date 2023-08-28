"use client";

import { signOut } from "next-auth/react";

export function LogoutText() {
  return (
    <button
      className="h-full w-full text-left"
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
    >
      Log out
    </button>
  );
}
