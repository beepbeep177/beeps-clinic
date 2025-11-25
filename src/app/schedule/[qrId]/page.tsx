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
    <div className="min-h-screen bg-base-200 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Book Your Appointment</h1>
          <p className="text-base-content/60">Select your preferred date and time</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Date & Time Selection */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title mb-4">Select Date & Time</h2>
              
              {/* Date Picker */}
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text font-semibold">Choose Date</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="input input-bordered"
                  min={new Date().toISOString().slice(0, 10)}
                />
              </div>

              {/* Time Slots */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Available Times</span>
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
                        className={`btn btn-sm ${
                          taken 
                            ? 'btn-disabled' 
                            : selected 
                            ? 'btn-primary' 
                            : 'btn-outline'
                        }`}
                      >
                        {slot}
                        {taken && <span className="text-xs">Booked</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Patient Information */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title mb-4">Your Information</h2>
              
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Full Name *</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input input-bordered"
                />
              </div>

              {/* Booking Summary */}
              {selectedTime && name && (
                <div className="alert alert-info mb-4">
                  <div>
                    <h3 className="font-bold">Booking Summary</h3>
                    <p>Date: {date}</p>
                    <p>Time: {selectedTime}</p>
                    <p>Patient: {name}</p>
                  </div>
                </div>
              )}

              <button
                onClick={book}
                disabled={loading || !selectedTime || !name}
                className={`btn btn-primary btn-lg w-full ${loading ? 'loading' : ''}`}
              >
                {loading ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
