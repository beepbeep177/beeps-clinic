// app/schedule/[qrId]/page.tsx (simplified)
"use client";
import { useState, useEffect, use } from "react";
import { supabase } from "@/lib/supabaseClient";
import { format, addMinutes } from "date-fns";

export default function SchedulePage({ params }: { params: Promise<{ qrId: string }> }) {
  const { qrId } = use(params);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10)); // yyyy-mm-dd
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const slotInterval = 30; // minutes

  useEffect(() => {
    fetchBooked();
  }, [date]);

  async function fetchBooked(){
    const { data, error } = await supabase
      .from('appointments')
      .select('time')
      .eq('qr_id', qrId)
      .eq('date', date);
    if (data) setBookedTimes(data.map(d => d.time));
  }

  // generate slots e.g. 09:00 - 16:30
  function generateSlots(){
    const start = new Date(date + "T09:00:00");
    const end = new Date(date + "T17:00:00");
    const slots: string[] = [];
    let current = start;
    while (current <= end) {
      slots.push(format(current, "HH:mm"));
      current = addMinutes(current, slotInterval);
    }
    return slots;
  }

  async function book(){
    if(!selectedTime || !name) return alert('Enter name & select time');
    setLoading(true);
    // double-check on server (we do a simple insert and rely on DB check)
    const { data, error } = await supabase
      .from('appointments')
      .insert([{ qr_id: qrId, name, phone, date, time: selectedTime }]);
    setLoading(false);
    if (error) {
      alert('Booking failed: ' + error.message);
    } else {
      alert('Booked! See you at ' + selectedTime);
      fetchBooked();
    }
  }

  const slots = generateSlots();

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book appointment</h1>
      <label className="block mb-2">Date
        <input value={date} onChange={e=>setDate(e.target.value)} type="date" className="block border p-2"/>
      </label>

      <div className="grid grid-cols-3 gap-2 mt-4">
        {slots.map(s => {
          const taken = bookedTimes.includes(s);
          return (
            <button
              key={s}
              disabled={taken}
              onClick={() => setSelectedTime(s)}
              className={`p-2 rounded ${taken ? 'bg-gray-300' : selectedTime===s ? 'bg-blue-500 text-white' : 'bg-white border'}`}
            >
              {s} {taken && '• Booked'}
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} className="w-full border p-2 mb-2"/>
        <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} className="w-full border p-2 mb-2"/>
        <button onClick={book} disabled={loading} className="w-full bg-green-600 text-white p-2 rounded">
          {loading ? 'Booking...' : `Book ${selectedTime ?? ''}`}
        </button>
      </div>
    </div>
  );
}
