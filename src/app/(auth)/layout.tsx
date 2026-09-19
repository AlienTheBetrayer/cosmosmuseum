export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-full mt-24 items-center justify-center p-2">
      {children}
    </main>
  );
}
