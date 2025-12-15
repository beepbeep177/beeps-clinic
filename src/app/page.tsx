"use client";
import DarkVeil from "@/components/DarkVeil";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0">
        <DarkVeil />
      </div>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 relative z-10">
        <div className="backdrop-blur-xl bg-base-100/70 border border-base-200 rounded-3xl p-12 shadow-2xl max-w-2xl text-center transition-all duration-300 hover:border-primary hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]">
          <h1 className="text-6xl font-extrabold mb-6 text-base-content hover:text-primary transition-colors duration-300">
            QR Clinic
          </h1>

          <p className="text-lg mb-8 text-base-content opacity-80">
            Modern appointment booking system powered by QR code technology
          </p>

          <a
            href="/schedule/clinic-general"
            className="btn btn-primary px-10 py-3 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Book Appointment
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 pb-24">
        <h2 className="text-4xl font-bold text-center mb-14 text-base-content">
          Quick Access
        </h2>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Admin Card */}
          <div className="backdrop-blur-xl bg-base-100 border border-base-200 shadow-xl rounded-3xl p-8 hover:bg-base-100/70 hover:border-primary hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-300">
            <div className="text-4xl mb-4">⚙️</div>
            <h3 className="text-3xl font-semibold mb-3 text-base-content">
              Admin Panel
            </h3>

            <p className="text-base-content opacity-70 mb-6">
              Manage appointments and generate QR codes
            </p>

            <div className="flex gap-3 justify-end">
              <a href="/admin" className="btn btn-primary btn-sm rounded-xl">
                View Appointments
              </a>

              <a href="/admin/generate-qr" className="btn btn-outline btn-sm rounded-xl">
                Generate QR
              </a>
            </div>
          </div>

          {/* Patient Card */}
          <div className="backdrop-blur-xl bg-base-100 border border-base-200 shadow-xl rounded-3xl p-8 hover:bg-base-100/70 hover:border-primary hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-300">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-3xl font-semibold mb-3 text-base-content">
              Patient Booking
            </h3>

            <p className="text-base-content opacity-70 mb-6">
              Book your appointment quickly and easily
            </p>

            <div className="flex justify-end">
              <a href="/schedule/clinic-general" className="btn btn-primary btn-sm rounded-xl">
                Book Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
