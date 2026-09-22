export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-full h-[90%] items-center justify-center p-2">
      {children}
    </main>
  );
}
