"use client";

import { Session } from "next-auth";
import { ZodError } from "zod";
import UserSettings from "~/components/user-settings";
import { useToast } from "~/hooks/toast";
import { updateUser } from "./action";

export default function SettingsForm({ user }: { user: Session["user"] }) {
  const { toast } = useToast();

  async function onUpdate(formData: FormData) {
    const res = await updateUser(formData);
    if (res && res instanceof ZodError) {
      toast({
        title: "Uh oh! There was an error!",
        description: (
          <>
            {res.issues[0].path[0]}: {res.issues[0].message}
          </>
        ),
      });
    } else {
      toast({
        title: "Success!",
        description: "Your settings have been saved.",
      });
    }
  }

  return (
    <form action={onUpdate}>
      <UserSettings user={user!} />
    </form>
  );
}
