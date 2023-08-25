"use client";

import { signIn, signOut } from "next-auth/react";
import { Button, ButtonProps } from "./ui/button";

export function Login(props: ButtonProps) {
  return (
    <Button {...props} onClick={() => signIn()}>
      Login
    </Button>
  );
}

export function Logout() {
  return <Button onClick={() => signOut()}>Log out</Button>;
}

export function LogoutText() {
  return <button onClick={() => signOut()}>Log out</button>;
}
