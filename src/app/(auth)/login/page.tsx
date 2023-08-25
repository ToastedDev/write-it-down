import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { getCurrentUser } from "~/server/auth";
import LoginForm from "./form";

export default async function SignInPage() {
  const user = await getCurrentUser();

  if (user) return redirect("/");

  return (
    <Card className="w-[350px]">
      <CardHeader className="pb-4">
        <CardTitle>Login</CardTitle>
        <CardDescription>Welcome back! We&apos;ve missed you.</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
