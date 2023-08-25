"use client";

import { signOut } from "next-auth/react";

export function LogoutText() {
  return (
    <button className="w-full h-full text-left" onClick={() => signOut()}>
      Log out
    </button>
  );
}
