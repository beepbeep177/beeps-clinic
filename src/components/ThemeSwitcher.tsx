"use client";
import { useEffect, useState, useRef } from "react";

const themes = [
  "corporate",
  "garden",
  "cupcake",
  "luxury",
  "dark",
  "light",
] as const;

export default function ThemeSwitcher() {
  const DEFAULT = "corporate";
  const [theme, setTheme] = useState<string>(DEFAULT);
  const sampleRef = useRef<HTMLButtonElement | null>(null);
  const [sampleBg, setSampleBg] = useState<string>("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      const initial = stored || DEFAULT;
      setTheme(initial);
      document.documentElement.setAttribute("data-theme", initial);
    } catch (e) {
      // ignore (server-safe)
      setTheme(DEFAULT);
    }
  }, []);

  useEffect(() => {
    const el = sampleRef.current;
    if (el) {
      setTimeout(() => {
        const bg = getComputedStyle(el).backgroundColor;
        setSampleBg(bg);
      }, 30);
    }
  }, [theme]);

  const cycle = () => {
    const idx = themes.indexOf(theme as any);
    const next = themes[(idx + 1) % themes.length];
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={cycle}
        className="px-3 py-1.5 text-sm rounded-xl bg-base-200 hover:bg-base-300 transition text-base-content flex items-center gap-2 border-2"
        title={`Current: ${theme} (click to cycle)`}
      >
        🎨 <span className="hidden sm:inline capitalize">{theme}</span>
      </button>

      <button ref={sampleRef} className="btn btn-sm btn-primary hidden">
        x
      </button>
      <div className="hidden md:flex flex-col text-xs">
        <div className="text-base-content opacity-80">{theme}</div>
        <div className="text-base-content opacity-60">{sampleBg || "—"}</div>
      </div>
    </div>
  );
}
