"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    router.push("/");
  };

  const requireAuth = () => {
    if (!loading && !isAdmin) {
      router.push("/login");
    }
  };
  return { isAdmin, loading, logout, requireAuth };
}