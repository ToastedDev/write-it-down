import { redirect } from "next/navigation";
import { getCurrentUser } from "~/server/auth";

export default async function LoginRequiredLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user)
    return redirect(
      `/login?message=${encodeURIComponent("You need to be logged in.")}`
    );

  return <div className="flex-grow">{children}</div>;
}
