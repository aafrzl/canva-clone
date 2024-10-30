import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Modals } from "@/components/modals";
import { SubscriptionAlert } from "@/components/subscription-alert";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Designify",
  description:
    "Designify is a design tool like canva for creating beautiful designs.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html
        lang="en"
        suppressHydrationWarning
      >
        <body className={cn("antialiased", inter.className)}>
          <Providers>
            <SubscriptionAlert />
            <Modals />
            {children}
            <Toaster />
          </Providers>
        </body>
      </html>
    </SessionProvider>
  );
}
