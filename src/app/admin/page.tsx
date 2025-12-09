"use client";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";

interface Appointment {
  _id: string;
  name: string;
  date: string;
  time: string;
  phone: string;
  reason?: string;
  qrId?: string;
}

export default function Admin() {
  const { isAdmin, loading, logout, requireAuth } = useAuth();
  const [items, setItems] = useState<Appointment[]>([]);

  // All hooks must be at the top, before any conditional returns
  useEffect(() => {
    requireAuth();
  }, [isAdmin, loading, requireAuth]);

  useEffect(() => {
    if (isAdmin && !loading) {
      fetchItems();
    }
  }, [isAdmin, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-base-content">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; //redirects back to login
  }

  async function fetchItems() {
    try {
      const response = await fetch("/api/appointments");
      const data = await response.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
      setItems([]);
    }
  }

  async function cancel(id: string) {
    await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
    fetchItems();
  }

  return (
    <div className="min-h-screen relative p-4 sm:p-6 lg:p-8">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] -z-10" />

      <div className="container mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="backdrop-blur-xl bg-base-100 border border-base-200 p-4 sm:p-6 rounded-2xl shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-base-content">
              Admin Dashboard
            </h1>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <a href="/admin/generate-qr" className="btn btn-sm sm:btn-md rounded-xl btn-primary">
                Generate QR
              </a>
              <button onClick={logout} className="btn btn-sm sm:btn-md rounded-xl btn-error">
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="backdrop-blur-xl bg-base-100 border border-base-200 shadow-2xl rounded-2xl p-6">
          <div className="stat-title text-base-content opacity-70 text-sm">Total Appointments</div>
          <div className="stat-value text-cyan-300 text-3xl sm:text-4xl">{items.length}</div>
        </div>

        {/* Appointments Table */}
        <div className="backdrop-blur-xl bg-base-100 border border-base-200 shadow-2xl rounded-2xl p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-base-content mb-4">
            Appointments
          </h2>

          {items.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-base-content opacity-60">No appointments yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="table table-zebra w-full">
                <thead>
                  <tr className="text-base-content text-center">
                    <th className="bg-base-200 w-[20%] text-center">Patient</th>
                    <th className="bg-base-200 w-[20%] text-center">Date & Time</th>
                    <th className="bg-base-200 w-[18%] text-center">Phone</th>
                    <th className="bg-base-200 w-[27%] hidden sm:table-cell text-center">Reason</th>
                    <th className="bg-base-200 w-[15%] text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item._id} className="hover text-center">
                      <td className="font-semibold">{item.name}</td>
                      <td>
                        <div className="flex flex-col gap-0.5 items-center">
                          <span className="font-medium text-sm">{item.date}</span>
                          <span className="text-xs opacity-60">{item.time}</span>
                        </div>
                      </td>
                      <td className="text-sm">{item.phone}</td>
                      <td className="hidden sm:table-cell text-sm">{item.reason || "-"}</td>
                      <td>
                        <button
                          onClick={() => cancel(item._id)}
                          className="px-2 py-1 text-xs rounded-lg bg-error text-error-content hover:bg-error/80 transition"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
