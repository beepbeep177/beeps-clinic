"use client";
import { useCallback, useEffect, useState } from "react";

type UseAuthReturn = {
  isAdmin: boolean;
  loading: boolean;
  logout: () => void;
  requireAuth: () => void;
};

export default function useAuth(): UseAuthReturn {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("isAdmin");
      setIsAdmin(stored === "true");
    } catch (e) {
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem("isAdmin");
    } catch (e) { }
    setIsAdmin(false);
    // redirect to login page if present
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }, []);

  const requireAuth = useCallback(() => {
    if (loading) return;
    if (!isAdmin && typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }, [isAdmin, loading]);

  return { isAdmin, loading, logout, requireAuth };
}
