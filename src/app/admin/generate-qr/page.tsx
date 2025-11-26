"use client";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

export default function GenerateQr() {
  const [qrId, setQrId] = useState("clinic-general");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQR = async () => {
    setLoading(true);
    const url = `${window.location.origin}/schedule/${qrId}`;

    try {
      const qrImage = await QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });
      setImg(qrImage);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    generateQR();
  }, [qrId]);

  const downloadQR = () => {
    const link = document.createElement("a");
    link.download = `qr-code-${qrId}.png`;
    link.href = img;
    link.click();
  };

  const printQR = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>QR Code - ${qrId}</title></head>
          <body style="text-align: center; padding: 20px;">
            <h2>QR Code for ${qrId}</h2>
            <img src="${img}" alt="QR Code" style="max-width: 100%;" />
            <p>Scan to book appointment</p>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="min-h-screen relative p-8 pt-20">

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] -z-10" />

      <div className="container mx-auto max-w-5xl">

        {/* Header */}
        <div
          className="
            flex justify-between items-center mb-10 
            backdrop-blur-xl bg-white/10 border border-white/20 
            p-6 rounded-2xl shadow-2xl
          "
        >
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            QR Code Generator
          </h1>

          <a
            href="/admin"
            className="
              btn rounded-xl px-5 
              bg-white/10 text-white border border-white/30
              hover:bg-white/20
            "
          >
            Back to Admin
          </a>
        </div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Left: QR Settings */}
          <div
            className="
              backdrop-blur-xl bg-white/10 
              border border-white/20 shadow-2xl 
              rounded-2xl p-6
            "
          >
            <h2 className="text-2xl text-white font-bold mb-6">
              QR Code Settings
            </h2>

            {/* QR ID Input */}
            <div className="form-control mb-6">
              <label className="label">
                <span className="text-white/80 font-semibold">QR Code ID</span>
              </label>
              <input
                type="text"
                value={qrId}
                onChange={(e) => setQrId(e.target.value)}
                className="
                  input rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/60
                "
                placeholder="clinic-general, clinic-dental, etc."
              />
              <label className="label">
                <span className="text-white/50 text-sm">
                  This will be part of the booking URL
                </span>
              </label>
            </div>

            {/* URL Display */}
            <div className="form-control mb-6">
              <label className="label">
                <span className="text-white/80 font-semibold">
                  Generated URL
                </span>
              </label>
              <input
                type="text"
                readOnly
                value={`${
                  typeof window !== "undefined" ? window.location.origin : ""
                }/schedule/${qrId}`}
                className="
                  input rounded-xl bg-white/5 border border-white/20 text-white
                "
              />
            </div>

            <button
              onClick={generateQR}
              disabled={loading}
              className="
                btn w-full rounded-xl mt-4 
                bg-blue-500 text-white border border-blue-300/50
                hover:bg-blue-600 
              "
            >
              {loading ? "Generating..." : "Generate QR Code"}
            </button>
          </div>

          {/* Right: QR Preview */}
          <div
            className="
              backdrop-blur-xl bg-white/10 
              border border-white/20 shadow-2xl 
              rounded-2xl p-6 text-center
            "
          >
            <h2 className="text-2xl text-white font-bold mb-6">
              QR Code Preview
            </h2>

            {img ? (
              <>
                <div className="bg-white p-4 rounded-xl inline-block mb-6">
                  <img src={img} alt="QR Code" className="w-64 mx-auto" />
                </div>

                <button
                  onClick={downloadQR}
                  className="
                    btn w-full rounded-xl mb-3
                    bg-green-500 text-white border border-green-300/50
                    hover:bg-green-600
                  "
                >
                  Download QR Code
                </button>

                <button
                  onClick={printQR}
                  className="
                    btn w-full rounded-xl
                    bg-white/10 text-white border border-white/30
                    hover:bg-white/20
                  "
                >
                  Print QR Code
                </button>

                <div className="mt-6 p-4 rounded-xl bg-white/10 border border-white/10">
                  <h3 className="font-semibold text-white mb-2">Instructions:</h3>
                  <ul className="text-sm text-white/70 text-left space-y-1">
                    <li>• Print and display this QR code at your clinic</li>
                    <li>• Patients can scan to book appointments</li>
                    <li>• URL: /schedule/{qrId}</li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <span className="loading loading-spinner loading-lg text-white"></span>
                <p className="mt-4 text-white/70">Generating QR code...</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
