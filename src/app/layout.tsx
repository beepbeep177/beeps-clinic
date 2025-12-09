import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative bg-base-100 min-h-screen">
        <Navbar />
        <main className="pt-24">{children}</main>
      </body>
    </html>
  );
}