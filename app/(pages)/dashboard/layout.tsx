import DashboardMenu from "@/app/components/DashboardMenu";

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  
  
    return (
      <section className="h-full flex-1 flex">
        <DashboardMenu />
        {children}
      </section>
    );
  }