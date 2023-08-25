"use client";

import { signIn } from "next-auth/react";
import { useMemo, useState } from "react";
import { BsDiscord, BsGithub } from "react-icons/bs";
import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";

export default function LoginForm() {
  const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false);
  const [isDiscordLoading, setIsDiscordLoading] = useState<boolean>(false);
  const isLoading = useMemo(
    () => isGithubLoading || isDiscordLoading,
    [isGithubLoading, isDiscordLoading]
  );

  return (
    <div className="flex flex-col gap-3">
      <Button
        className="w-full"
        disabled={isLoading}
        onClick={() => {
          setIsGithubLoading(true);
          signIn("github");
        }}
      >
        {isGithubLoading ? (
          <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.Github className="mr-2 h-4 w-4" />
        )}{" "}
        Login with GitHub
      </Button>
      <Button
        className="w-full bg-[#5865F2] hover:bg-[#5865F2]/90"
        disabled={isLoading}
        onClick={() => {
          setIsDiscordLoading(true);
          signIn("discord");
        }}
      >
        {isDiscordLoading ? (
          <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.Discord className="mr-2 h-4 w-4" />
        )}{" "}
        Login with Discord
      </Button>
    </div>
  );
}
