import DashboardMenu from "@/app/components/DashboardMenu";
import { getCookies } from "@/app/services/getCookies.services";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { token, accountId } = getCookies()

  return (
    <section className="h-full flex-1 flex">
      <DashboardMenu accountId={accountId} />
      <article className="flex-1 flex flex-col gap-4 items-center p-16 relative">
        {children}
        <Toaster
          toastOptions={{
            classNames: {
              error: 'bg-red-400',
              success: 'bg-green-400',

            },
          }}
        />
      </article>
    </section>
  );
}