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

  const themes = [
    "corporate",
    "business",
    "garden",
    "cupcake",
    "luxury",
    "dark",
    "light",
  ];

  const themeColors = {
    dark: '#ff6b6b',
    light: '#4ecdc4', 
    corporate: '#3b82f6',
    business: '#8b5cf6',
    garden: '#10b981',
    cupcake: '#f472b6',
    luxury: '#f59e0b'
  } as const;

  const getThemeColor = (currentTheme: string) => {
    return themeColors[currentTheme as keyof typeof themeColors] || '#6b7280';
  };

  return (
    <html lang="en" data-theme={theme}>
      <body className="relative">

{/* Modern Clean Navbar */}
<div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-[80%]">
  <div
    className="
      h-14
      rounded-2xl
      px-6
      flex items-center justify-between
      backdrop-blur-xl 
      bg-white/10 
      border border-white/20 
      shadow-lg
    "
  >
    {/* Logo */}
    <a
      href="/"
      className="text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 to-blue-400 text-transparent bg-clip-text"
    >
      QR Clinic
    </a>

    {/* Menu */}
    <div className="hidden md:flex gap-8 text-sm text-white/80">
      <a href="/" className="hover:text-white transition">Home</a>
      <a href="/schedule/clinic-general" className="hover:text-white transition">Book</a>
      <a href="/admin" className="hover:text-white transition">Admin</a>
    </div>

    {/* Right Side */}
    <div className="flex items-center gap-3">

      {/* Theme Cycler */}
      <button
        onClick={() => {
          const currentIndex = themes.indexOf(theme);
          const nextIndex = (currentIndex + 1) % themes.length;
          const newTheme = themes[nextIndex];
          setTheme(newTheme);
        }}
        className="
          px-3 py-1.5 text-sm rounded-xl 
          bg-white/10 hover:bg-white/20 transition
          text-white flex items-center gap-2 border-2
        "
        style={{ borderColor: getThemeColor(theme) }}
        title={`Current: ${theme} (click to cycle)`}
      >
        🎨 <span className="hidden sm:inline capitalize">{theme}</span>
      </button>

      {/* Mobile Menu */}
      <div className="dropdown dropdown-end md:hidden">
        <button
          tabIndex={0}
          className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition"
          aria-label="Open Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>

        <ul
          tabIndex={0}
          className="
            dropdown-content menu 
            mt-3 p-2 w-44 rounded-xl
            backdrop-blur-xl bg-white/20 
            border border-white/30 shadow-lg
            z-[100]
          "
        >
          <li><a href="/" className="text-white hover:bg-white/20 rounded-lg">Home</a></li>
          <li><a href="/schedule/clinic-general" className="text-white hover:bg-white/20 rounded-lg">Book</a></li>
          <li><a href="/admin" className="text-white hover:bg-white/20 rounded-lg">Admin</a></li>
        </ul>
      </div>

    </div>
  </div>
</div>



        {/* Page Content */}
        <div>{children}</div>
      </body>
    </html>
  );
}
