import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "~/components/nav";
import { cn } from "~/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Write It Down!",
  description: "A simple notetaking app for your simple needs.",
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
