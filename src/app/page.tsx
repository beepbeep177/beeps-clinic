export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl max-w-xl text-center">
          <h1 className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
            QR Clinic
          </h1>
          <p className="text-lg mb-8 text-gray-200">
            Modern appointment booking system powered by QR code technology
          </p>
          <a
            href="/schedule/clinic-general"
            className="px-8 py-3 rounded-full font-semibold 
                       bg-gradient-to-r from-blue-500 to-teal-400 
                       hover:from-blue-600 hover:to-teal-500 
                       shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Book Appointment
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 pb-24">
        <h2 className="text-4xl font-bold text-center mb-14 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-blue-400">
          Quick Access
        </h2>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          
          {/* Admin Card */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl rounded-3xl p-8 hover:bg-white/20 transition-all duration-300">
            <h3 className="text-3xl font-semibold mb-3">Admin Panel</h3>
            <p className="text-gray-300 mb-6">Manage appointments and generate QR codes</p>
            <div className="flex gap-3 justify-end">
              <a
                href="/admin"
                className="px-5 py-2 rounded-xl bg-blue-500/70 hover:bg-blue-500 transition-all duration-300"
              >
                View Appointments
              </a>
              <a
                href="/admin/generate-qr"
                className="px-5 py-2 rounded-xl bg-teal-500/70 hover:bg-teal-500 transition-all duration-300"
              >
                Generate QR
              </a>
            </div>
          </div>

          {/* Patient Card */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl rounded-3xl p-8 hover:bg-white/20 transition-all duration-300">
            <h3 className="text-3xl font-semibold mb-3">Patient Booking</h3>
            <p className="text-gray-300 mb-6">Book your appointment quickly and easily</p>
            <div className="flex justify-end">
              <a
                href="/schedule/clinic-general"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 transition-all duration-300"
              >
                Book Now
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
