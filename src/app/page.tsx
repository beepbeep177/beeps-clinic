export default function Home() {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="hero min-h-screen bg-gradient-to-r from-primary to-secondary">
        <div className="hero-content text-center text-primary-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">QR Clinic</h1>
            <p className="mb-5 text-xl">Modern appointment booking system with QR code technology</p>
            <a href="/schedule/clinic-general" className="btn btn-accent btn-lg">Book Appointment</a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Quick Access</h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Admin Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl">Admin Panel</h2>
              <p>Manage appointments and generate QR codes</p>
              <div className="card-actions justify-end space-x-2">
                <a href="/admin" className="btn btn-primary">View Appointments</a>
                <a href="/admin/generate-qr" className="btn btn-secondary">Generate QR</a>
              </div>
            </div>
          </div>

          {/* Patient Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl">Patient Booking</h2>
              <p>Book your appointment quickly and easily</p>
              <div className="card-actions justify-end">
                <a href="/schedule/clinic-general" className="btn btn-accent">Book Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
