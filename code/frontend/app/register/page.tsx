"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL = "http://localhost:3000/api";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      // 🔥 AMAN: jangan langsung res.json()
      const text = await res.text();
      console.log("STATUS:", res.status);
      console.log("BODY:", text);

      if (!res.ok) {
        setError("Register gagal");
        return;
      }

      alert("Register berhasil");

    } catch (err) {
      console.error("FE FETCH ERROR:", err);
      setError("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center mb-6">
                    Daftar Akun
                </h1>

                {error && (
                    <p className="text-red-600 text-sm mb-3 text-center">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        placeholder="Nama Lengkap"
                        className="w-full border px-3 py-2 rounded-md"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border px-3 py-2 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border px-3 py-2 rounded-md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        disabled={loading}
                        className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 disabled:opacity-50"
                    >
                        {loading ? "Loading..." : "Daftar"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm">
                    Sudah punya akun?{" "}
                    <Link href="/loginuser" className="text-teal-600 font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
