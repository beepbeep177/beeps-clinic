"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Appointment {
  id: string;
  name: string;
  date: string;
  time: string;
  phone: string;
  reason?: string;
}

export default function Admin(){
  const [items, setItems] = useState<Appointment[]>([]);
  useEffect(()=> { fetchItems(); }, []);
  async function fetchItems(){
    const { data } = await supabase.from('appointments').select('*').order('date', { ascending: true }).limit(200);
    setItems(data || []);
  }
  async function cancel(id: string){
    await supabase.from('appointments').delete().eq('id', id);
    fetchItems();
  }
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold">Admin - Appointments</h1>
      <ul>
        {items.map(it => (
          <li key={it.id} className="border p-2 my-2 flex justify-between">
            <div>
              <div>{it.name} — {it.date} {it.time}</div>
              <div className="text-sm text-gray-600">{it.phone} {it.reason}</div>
            </div>
            <button onClick={()=>cancel(it.id)} className="bg-red-500 text-white p-2 rounded">Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
