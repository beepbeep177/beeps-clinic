"use client";
import { useState, useEffect, use } from "react";
import { format, addMinutes } from "date-fns";

export default function SchedulePage({
  params,
}: {
  params: Promise<{ qrId: string }>;
}) {
  const { qrId } = use(params);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const slotInterval = 30;

  useEffect(() => {
    fetchBooked();
  }, [date]);

  async function fetchBooked() {
    const response = await fetch(`/api/appointments?qrId=${qrId}&date=${date}`);
    const data = await response.json();
    if (data) setBookedTimes(data.map((d: any) => d.time));
  }

  function generateSlots() {
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

  async function book() {
    if (!selectedTime || !name) return alert("Enter name & select time");
    setLoading(true);

    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ qrId, name, phone, date, time: selectedTime })
    });

    setLoading(false);
    if (!response.ok) {
      alert("Booking failed");
    } else {
      alert("Booked! See you at " + selectedTime);
      fetchBooked();
      setName("");
      setPhone("");
      setSelectedTime(null);
    }
  }

  const slots = generateSlots();

  return (
    <div className="min-h-screen p-6 pt-20 relative">

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] -z-10" />

      <div className="container mx-auto max-w-5xl pt-28">
        {/* Header */}
        <div className="text-center mb-12 text-white">
          <h1 className="text-5xl font-bold mb-2 tracking-tight bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
            Book Appointment
          </h1>
          <p className="text-white/70">Choose a schedule that works for you</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Date & Time Selection */}
          <div
            className="
              backdrop-blur-xl bg-white/10 
              border border-white/20 shadow-2xl 
              rounded-2xl p-6
            "
          >
            <h2 className="text-xl font-bold text-white mb-6">Select Date & Time</h2>

            {/* Date Picker */}
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text text-white/80 font-semibold">Choose Date</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="
                  input input-bordered bg-white/20 text-white 
                  border-white/30 backdrop-blur-lg
                "
                min={new Date().toISOString().slice(0, 10)}
              />
            </div>

            {/* Time Slots */}
            <div>
              <label className="label">
                <span className="label-text text-white/80 font-semibold">
                  Available Times
                </span>
              </label>

              <div className="grid grid-cols-3 gap-2">
                {slots.map((slot) => {
                  const taken = bookedTimes.includes(slot);
                  const selected = selectedTime === slot;

                  return (
                    <button
                      key={slot}
                      disabled={taken}
                      onClick={() => setSelectedTime(slot)}
                      className={`
                        btn btn-sm rounded-xl 
                        ${
                          taken
                            ? "btn-disabled opacity-40"
                            : selected
                            ? "bg-blue-500 text-white"
                            : "border border-white/30 text-white hover:bg-white/10"
                        }
                        backdrop-blur-md
                      `}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Patient Information */}
          <div
            className="
              backdrop-blur-xl bg-white/10 
              border border-white/20 shadow-2xl 
              rounded-2xl p-6
            "
          >
            <h2 className="text-xl font-bold text-white mb-6">Your Information</h2>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-white/80">Full Name *</span>
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
                  input input-bordered bg-white/20 text-white 
                  border-white/30 backdrop-blur-lg
                "
              />
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text text-white/80">Phone Number</span>
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="
                  input input-bordered bg-white/20 text-white 
                  border-white/30 backdrop-blur-lg
                "
              />
            </div>

            {/* Booking Summary */}
            {selectedTime && name && (
              <div
                className="
                  p-4 rounded-xl mb-4 
                  bg-blue-500/20 border border-blue-300/30
                  backdrop-blur-xl text-white
                "
              >
                <h3 className="font-semibold">Booking Summary</h3>
                <p>Date: {date}</p>
                <p>Time: {selectedTime}</p>
                <p>Patient: {name}</p>
              </div>
            )}

            <button
              onClick={book}
              disabled={loading || !selectedTime || !name}
              className={`
                btn btn-primary w-full rounded-xl 
                ${loading ? "loading" : ""}
              `}
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
