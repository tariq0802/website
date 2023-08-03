import NavBar from "@/components/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Noto_Serif_Bengali } from "next/font/google";
import Container from "@/components/container";
import Provider from "@/providers/provider";
import { getAuthSession } from "@/lib/auth";
import { Toaster } from "@/components/ui/toaster";

const noto = Noto_Serif_Bengali({ subsets: ["bengali"],  });
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
      <body className={noto.className}>
        <Provider>
          <NavBar session={session} />
          <Container>
            <div className="pt-36">{children}</div>
          </Container>
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
