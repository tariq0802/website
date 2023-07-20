import NavBar from "@/components/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Container from "@/components/container";
import Provider from "@/providers/provider";
import { getAuthSession } from "@/lib/auth";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <NavBar session={session} />
          <Container>
            <div className="pt-32">{children}</div>
          </Container>
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
