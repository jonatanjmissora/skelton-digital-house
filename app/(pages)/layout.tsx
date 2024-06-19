export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <section className="flex-1 flex justify-center items-center text-black">
      {children}
    </section>
  );
}
