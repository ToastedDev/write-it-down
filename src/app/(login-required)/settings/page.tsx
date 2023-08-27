import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { getCurrentUser } from "~/server/auth";
import SettingsForm from "./form";

export default async function Settings() {
  const user = await getCurrentUser();

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Settings</CardTitle>
          <CardDescription>Need to change something?</CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <SettingsForm user={user!} />
        </CardContent>
      </Card>
    </div>
  );
}
