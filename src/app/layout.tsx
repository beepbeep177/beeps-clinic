import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative bg-base-100 min-h-screen">
        {/* NAVBAR */}
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-[80%]">
          <div
            className="h-14 rounded-2xl px-6 flex items-center justify-between 
            backdrop-blur-xl bg-base-100/80 border border-base-200 shadow-lg"
          >
            {/* Logo */}
            <a href="/" className="text-xl font-bold tracking-tight">
              QR Clinic
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 text-sm">
              <a href="/" className="hover:text-primary">
                Home
              </a>
              <a href="/schedule/clinic-general" className="hover:text-primary">
                Book
              </a>
              <a href="/admin" className="hover:text-primary">
                Admin
              </a>
            </div>

            {/* Mobile Nav */}
            <div className="flex items-center gap-3">
              <div className="dropdown dropdown-end md:hidden">
                <button
                  tabIndex={0}
                  className="px-3 py-1.5 rounded-xl bg-base-200 hover:bg-base-300"
                >
                  ☰
                </button>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu mt-3 p-2 w-44 rounded-xl bg-base-200 border border-base-300 shadow-lg"
                >
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/schedule/clinic-general">Book</a>
                  </li>
                  <li>
                    <a href="/admin">Admin</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <main className="pt-24">{children}</main>
      </body>
    </html>
  );
}