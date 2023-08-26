import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "~/components/nav";
import { cn } from "~/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "h-screen")}>
        <main className="h-full flex flex-col">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
