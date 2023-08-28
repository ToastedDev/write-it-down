import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "~/components/nav";
import Providers from "~/components/providers";
import { Toaster } from "~/components/ui/toaster";
import { getCurrentUser } from "~/server/auth";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  metadataBase: new URL("https://write-it-down.vercel.app"),
  title: "Write It Down!",
  description: "A simple notetaking app for your simple needs.",
  themeColor: "#ffffff",
  twitter: {
    card: "summary_large_image",
    creator: "@ToastedDev",
    creatorId: "1145171094556426240",
  },
  openGraph: {
    type: "website",
    url: "/",
  },
  manifest: "/site.webmanifest",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  // read the custom x-url header
  const url = new URL(headersList.get("x-url") || "");

  const user = await getCurrentUser();
  if (user && user.id) {
    const userFromDb = (
      await db.select().from(users).where(eq(users.id, user.id))
    )[0];
    if (userFromDb) {
      if (userFromDb.onboarding && url.pathname !== "/onboarding")
        return redirect("/onboarding");
      if (!userFromDb.onboarding && url.pathname === "/onboarding")
        return redirect("/");
    }
  }

  return (
    <html lang="en" className={inter.className}>
      <body className="h-screen">
        <main className="flex h-full flex-col">
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
