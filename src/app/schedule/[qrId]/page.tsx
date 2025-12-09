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
  const [reason, setReason] = useState("");
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

    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qrId, name, phone, date, time: selectedTime, reason }),
    });

    setLoading(false);
    if (!response.ok) {
      alert("Booking failed");
    } else {
      alert("Booked! See you at " + selectedTime);
      fetchBooked();
      setName("");
      setPhone("");
      setReason("");
      setSelectedTime(null);
    }
  }

  const slots = generateSlots();

  return (
    <div className="min-h-screen p-6 pt-20 relative bg-gradient-to-br from-base-100 via-base-200 to-base-300">

      <div className="container mx-auto max-w-5xl pt-28">
        {/* Header */}
        <div className="text-center mb-12 text-base-content">
          <h1 className="text-5xl font-bold mb-2 tracking-tight text-primary">
            📅 Book Appointment
          </h1>
          <p className="text-base-content opacity-70">
            Choose a schedule that works for you
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Date & Time Selection */}
          <div
            className="
              backdrop-blur-xl bg-base-100 
              border border-base-200 shadow-2xl 
              rounded-2xl p-6 hover:border-primary hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-300
            "
          >
            <h2 className="text-xl font-bold text-base-content mb-6">
              📅 Select Date & Time
            </h2>

            {/* Date Picker */}
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text text-base-content opacity-80 font-semibold">
                  Choose Date
                </span>
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
                <span className="label-text text-base-content opacity-80 font-semibold">
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
                      className={`btn btn-sm rounded-xl transition-all ${
                        taken
                          ? "btn-disabled opacity-30 cursor-not-allowed"
                          : selected
                          ? "btn btn-sm btn-primary"
                          : "btn btn-sm btn-ghost hover:border-primary"
                      } backdrop-blur-md`}
                    >
                      {slot}
                      {taken && (
                        <span className="block text-xs text-base-content opacity-70 font-normal">
                          Booked
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Patient Information */}
          <div
            className="
              backdrop-blur-xl bg-base-100 
              border border-base-200 shadow-2xl 
              rounded-2xl p-6 hover:border-primary hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-300
            "
          >
            <h2 className="text-xl font-bold text-base-content mb-6">
              👤 Your Information
            </h2>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-base-content opacity-80">
                  Full Name *
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered"
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-base-content opacity-80">
                  Phone Number
                </span>
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input input-bordered"
              />
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text text-black-content opacity-80">
                  Reason for Visit
                </span>
              </label>
              <textarea
                placeholder="Brief reason for your visit (optional)"
                value={reason}
                onChange={(e) => setReason(e.target.value.slice(0, 100))}
                maxLength={100}
                className="textarea textarea-bordered h-20 resize-none"
              />
              <label className="label">
                <span className="label-text-alt text-base-content opacity-60">
                  {reason.length}/100 characters
                </span>
              </label>
            </div>

            {/* Booking Summary */}
            {selectedTime && name && (
              <div
                className="
                  p-4 rounded-xl mb-4 
                  bg-primary/20 border border-primary/30
                  backdrop-blur-xl text-base-content
                "
              >
                <h3 className="font-semibold mb-2 text-primary">✓ Booking Summary</h3>
                <p className="mb-1"><span className="opacity-70">Date:</span> <span className="font-semibold">{format(new Date(date), "MMMM dd, yyyy")}</span></p>
                <p className="mb-1"><span className="opacity-70">Time:</span> <span className="font-semibold">{selectedTime}</span></p>
                <p><span className="opacity-70">Patient:</span> <span className="font-semibold">{name}</span></p>
              </div>
            )}

            <button
              onClick={book}
              disabled={loading || !selectedTime || !name}
              className="btn w-full rounded-xl btn-primary disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm text-base-content"></span>
                  Booking...
                </>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
