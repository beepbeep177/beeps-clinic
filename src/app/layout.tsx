"use client";
import { useState, useEffect } from "react";
import type { Metadata } from "next";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState("corporate");
  
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const themes = ["corporate", "business", "garden", "cupcake", "luxury", "dark", "light"];

  return (
    <html lang="en" data-theme={theme}>
      <body>
        {/* Navigation */}
        <div className="navbar bg-base-100 shadow-lg">
          <div className="navbar-start">
            <a href="/" className="btn btn-ghost text-xl font-bold">QR Clinic</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li><a href="/">Home</a></li>
              <li><a href="/schedule/clinic-general">Book Appointment</a></li>
              <li><a href="/admin">Admin</a></li>
            </ul>
          </div>
          <div className="navbar-end">
            {/* Theme Switcher */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost">
                🎨 Theme
              </div>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-50">
                {themes.map((t) => (
                  <li key={t}>
                    <button onClick={() => setTheme(t)} className={theme === t ? "active" : ""}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dropdown dropdown-end lg:hidden ml-2">
              <div tabIndex={0} role="button" className="btn btn-ghost">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><a href="/">Home</a></li>
                <li><a href="/schedule/clinic-general">Book Appointment</a></li>
                <li><a href="/admin">Admin</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        {children}
      </body>
    </html>
  );
}