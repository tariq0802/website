import { redirect } from "next/navigation";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return <main className="bg-gray-200">{children}</main>;
}
