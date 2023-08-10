import NavBar from "@/components/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import Container from "@/components/container";
import Provider from "@/providers/provider";
import { getAuthSession } from "@/lib/auth";
import { Toaster } from "@/components/ui/toaster";
import { db } from "@/lib/db";
import Header from "@/components/header";

const noto = Noto_Serif_Bengali({ subsets: ["bengali"] });

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
  const news = await db.category.findMany({
    where: { parentId: "cll2p69yq0001rvg050ck12j2" },
  });
  const preparetion = await db.category.findMany({
    where: { parentId: "cll2paocr0005rvg0b96feotc" },
  });

  return (
    <html lang="en">
      <body className={noto.className}>
        <Provider>
          <header className="h-16 flex justify-between items-center relative">
            <Header session={session} />
          </header>
          <nav className="bg-slate-800 text-gray-100 sticky top-0 z-50">
            <NavBar news={news} preparetion={preparetion} />
          </nav>
          <Container>
            <div className="pt-36">{children}</div>
          </Container>
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
