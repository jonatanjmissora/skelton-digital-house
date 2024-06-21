import DashboardMenu from "@/app/components/DashboardMenu";
import { cookies } from "next/headers";

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  
  const accountId = cookies().get("accountid")?.value ?? ""

    return (
      <section className="h-full flex-1 flex">
        <DashboardMenu accountId={accountId} />
        <article className="flex-1 flex flex-col gap-4 items-center p-16">
          {children}
        </article>
      </section>
    );
  }