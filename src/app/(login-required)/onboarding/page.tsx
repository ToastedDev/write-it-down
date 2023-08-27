import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import UserSettings from "~/components/user-settings";
import { getCurrentUser } from "~/server/auth";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export default async function Onboarding() {
  const user = await getCurrentUser();

  async function finishOnboarding(formData: FormData) {
    "use server";

    if (!user) return;

    const values = z
      .object({
        name: z.string(),
        username: z.string().min(2).max(50),
      })
      .parse({
        name: formData.get("name"),
        username: formData.get("username"),
      });

    await db
      .update(users)
      .set({
        ...values,
        onboarding: false,
      })
      .where(eq(users.id, user.id));

    revalidatePath("/");
    redirect("/");
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Welcome!</CardTitle>
          <CardDescription>
            Let&apos;s get your account ready to go!
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <form action={finishOnboarding}>
            <UserSettings user={user!} />
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Don&apos;t worry! You can always change these in the settings.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
