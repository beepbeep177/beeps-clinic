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
    <div className="min-h-screen bg-base-200 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">QR Code Generator</h1>
          <a href="/admin" className="btn btn-outline">
            Back to Admin
          </a>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* QR Configuration */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title mb-4">QR Code Settings</h2>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold">QR Code ID</span>
                </label>
                <input
                  type="text"
                  value={qrId}
                  onChange={(e) => setQrId(e.target.value)}
                  className="input input-bordered"
                  placeholder="e.g., clinic-general, clinic-pediatric"
                />
                <label className="label">
                  <span className="label-text-alt">
                    This will be part of the booking URL
                  </span>
                </label>
              </div>

              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text font-semibold">
                    Generated URL
                  </span>
                </label>
                <input
                  type="text"
                  value={`${
                    typeof window !== "undefined" ? window.location.origin : ""
                  }/schedule/${qrId}`}
                  className="input input-bordered"
                  readOnly
                />
              </div>

              <button
                onClick={generateQR}
                disabled={loading}
                className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
              >
                {loading ? "Generating..." : "Generate QR Code"}
              </button>
            </div>
          </div>

          {/* QR Code Display */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title mb-4">Generated QR Code</h2>

              {img ? (
                <div className="text-center">
                  <div className="bg-white p-4 rounded-lg inline-block mb-4">
                    <img src={img} alt="QR Code" className="mx-auto" />
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={downloadQR}
                      className="btn btn-success w-full"
                    >
                      Download QR Code
                    </button>

                    <button
                      onClick={printQR}
                      className="btn btn-outline w-full"
                    >
                      Print QR Code
                    </button>
                  </div>

                  <div className="mt-4 p-4 bg-base-200 rounded-lg">
                    <h3 className="font-semibold mb-2">Instructions:</h3>
                    <ul className="text-sm text-left space-y-1">
                      <li>• Print and display this QR code at your clinic</li>
                      <li>• Patients can scan to book appointments</li>
                      <li>• Each QR code links to: /schedule/{qrId}</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="loading loading-spinner loading-lg"></div>
                  <p className="mt-4">Generating QR code...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
