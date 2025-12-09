"use client";
import { useEffect, useState } from "react";

interface Appointment {
  _id: string;
  name: string;
  date: string;
  time: string;
  phone: string;
  reason?: string;
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
    const response = await fetch("/api/appointments");
    const data = await response.json();
    setItems(data || []);
  }

  async function cancel(id: string) {
    await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
    fetchItems();
  }

  return (
    <div className="min-h-screen relative p-8 pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] -z-10" />

      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div
          className="
            flex justify-between items-center mb-10 
            backdrop-blur-xl bg-base-100 border border-base-200 
            p-6 rounded-2xl shadow-2xl
          "
        >
          <h1 className="text-4xl font-extrabold text-base-content tracking-tight">
            Admin Dashboard
          </h1>
          {/* Button Group */}
          <div className="flex gap-3">
            <a
              href="/admin/generate-qr"
              className="btn rounded-xl px-5 btn-primary"
            >
              Generate QR Code
            </a>

            <button onClick={logout} className="btn rounded-xl px-5 btn-error">
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div
          className="
            backdrop-blur-xl bg-base-100 
            border border-base-200 shadow-2xl 
            rounded-2xl p-6 mb-10
          "
        >
          <div className="stat">
            <div className="stat-title text-base-content opacity-70">
              Total Appointments
            </div>
            <div className="stat-value text-cyan-300">{items.length}</div>
          </div>
        </div>

        {/* Appointments Table */}
        <div
          className="
            backdrop-blur-xl bg-base-100 
            border border-base-200 shadow-2xl 
            rounded-2xl p-6
          "
        >
          <h2 className="text-2xl font-bold text-base-content mb-6">
            Appointments
          </h2>

          {items.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-base-content opacity-60">
                No appointments yet
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table text-base-content">
                <thead>
                  <tr className="text-base-content opacity-70">
                    <th>Patient</th>
                    <th>Date & Time</th>
                    <th>Phone</th>
                    <th>Reason</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-base-200 transition border-b border-base-200"
                    >
                      <td className="font-semibold">{item.name}</td>

                      <td>
                        <div className="flex flex-col">
                          <span className="font-medium">{item.date}</span>
                          <span className="text-sm opacity-60">
                            {item.time}
                          </span>
                        </div>
                      </td>

                      <td>{item.phone}</td>
                      <td>{item.reason || "-"}</td>

                      <td>
                        <button
                          onClick={() => cancel(item._id)}
                          className="btn btn-sm rounded-xl btn-error"
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
