import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { getCurrentUser } from "~/server/auth";
import LoginForm from "./form";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const user = await getCurrentUser();
  if (user) return redirect("/");

  let message =
    typeof searchParams.message === "object"
      ? searchParams.message[0]
      : searchParams.message;

  let redirectTo =
    typeof searchParams.redirectTo === "object"
      ? searchParams.redirectTo[0]
      : searchParams.redirectTo;

  return (
    <Card className="w-[350px]">
      <CardHeader className="pb-4">
        {message && (
          <div className="mb-2 rounded-md bg-red-600 px-3 py-2 text-white">
            {message}
          </div>
        )}
        <CardTitle>Login</CardTitle>
        <CardDescription>Welcome back! We&apos;ve missed you.</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm redirectTo={redirectTo} />
      </CardContent>
    </Card>
  );
}
