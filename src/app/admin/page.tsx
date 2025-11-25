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
  const [items, setItems] = useState<Appointment[]>([]);
  
  useEffect(() => {
    fetchItems();
  }, []);
  
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
    <div className="min-h-screen bg-base-200 p-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <a href="/admin/generate-qr" className="btn btn-primary">Generate QR Code</a>
        </div>

        {/* Stats */}
        <div className="stats shadow mb-8">
          <div className="stat">
            <div className="stat-title">Total Appointments</div>
            <div className="stat-value text-primary">{items.length}</div>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Appointments</h2>
            
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-base-content/60">No appointments yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Date & Time</th>
                      <th>Phone</th>
                      <th>Reason</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item._id}>
                        <td className="font-semibold">{item.name}</td>
                        <td>
                          <div className="flex flex-col">
                            <span className="font-medium">{item.date}</span>
                            <span className="text-sm opacity-60">{item.time}</span>
                          </div>
                        </td>
                        <td>{item.phone}</td>
                        <td>{item.reason || '-'}</td>
                        <td>
                          <button 
                            onClick={() => cancel(item._id)}
                            className="btn btn-error btn-sm"
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
    </div>
  );
}
