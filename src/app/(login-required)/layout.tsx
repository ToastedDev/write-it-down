import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentUser } from "~/server/auth";

export default async function LoginRequiredLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const url = new URL(headersList.get("x-url") || "");

  const user = await getCurrentUser();
  if (!user)
    return redirect(
      `/login?message=${encodeURIComponent(
        "You need to be logged in.",
      )}&redirectTo=${url.pathname}`,
    );

  return <div className="flex-grow">{children}</div>;
}
