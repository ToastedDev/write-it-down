import { Session } from "next-auth";
import SubmitButton from "~/components/submit";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function UserSettings({ user }: { user: Session["user"] }) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label htmlFor="name">Display name</Label>
        <Input
          name="name"
          placeholder="ToastedToast"
          defaultValue={user.name!}
        />
        <p className="text-sm text-muted-foreground">
          This will be shown on your profile.
        </p>
      </div>
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          name="username"
          placeholder="toasteddev"
          defaultValue={user.username!}
        />
        <p className="text-sm text-muted-foreground">
          People can use this name to go to your profile.
        </p>
      </div>
      <SubmitButton />
    </div>
  );
}
