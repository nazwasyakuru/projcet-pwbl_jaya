"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const requestReset = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Gagal mengirim request");
        return;
      }

      setResetToken(data.resetToken); // sementara tampil di FE
      setStep(2);
    } catch (err) {
      setMessage("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: resetToken,
            newPassword,
          }),
        }
      );

      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Gagal reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-teal-600 mb-6">
          Lupa Password
        </h1>

        {message && (
          <p className="text-center text-sm text-red-600 mb-4">
            {message}
          </p>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Masukkan email terdaftar"
              required
            />

            <button
              onClick={requestReset}
              disabled={loading}
              className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Kirim Reset"}
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <label className="block text-sm font-medium mb-1">
              Password Baru
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Minimal 8 karakter"
              required
            />

            <button
              onClick={resetPassword}
              disabled={loading}
              className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Reset Password"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
 