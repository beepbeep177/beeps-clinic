"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login(){
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      localStorage.setItem("isAdmin", "true");
      router.push("/admin");
    } else {
      setError("Incorrect password. Please try again.");
    }
    setLoading(false);
  };

  return (
     <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center px-6 pt-20">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Admin Login</h1>
        
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block text-white/80 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50"
              placeholder="Enter admin password"
              required
            />
          </div>
          
          {error && (
            <div className="text-red-400 text-sm mb-4 text-center">{error}</div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        
        <div className="text-center mt-6">
          <a href="/" className="text-white/60 hover:text-white transition">← Back to Home</a>
        </div>
      </div>
    </div>
  );
}