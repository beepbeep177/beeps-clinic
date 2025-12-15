"use client";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl px-4">
      <div className="h-14 rounded-2xl px-4 sm:px-6 flex items-center justify-between backdrop-blur-sm bg-transparent border border-white/20 shadow-lg">
        {/* Logo */}
        <a href="/" className="text-lg sm:text-xl font-bold tracking-tight whitespace-nowrap">
          Beep's Clinic
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm">
          <a href="/" className="hover:text-primary transition">
            Home
          </a>
          <a href="/schedule/clinic-general" className="hover:text-primary transition">
            Book
          </a>
          <a href="/admin" className="hover:text-primary transition">
            Admin
          </a>
        </div>

        {/* Mobile Menu */}
        <div className="relative md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn btn-ghost btn-sm px-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {isOpen && (
            <>
              <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
              <ul className="absolute right-0 mt-3 p-2 w-52 rounded-xl bg-base-100 border border-base-200 shadow-xl menu">
                <li><a href="/" onClick={() => setIsOpen(false)}>Home</a></li>
                <li><a href="/schedule/clinic-general" onClick={() => setIsOpen(false)}>Book Appointment</a></li>
                <li><a href="/admin" onClick={() => setIsOpen(false)}>Admin</a></li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
