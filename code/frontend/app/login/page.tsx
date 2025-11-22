"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [u, setU] = useState("");
  const [p, setP] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              value={u}
              onChange={(e) => setU(e.target.value)}
              type="text"
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Masukkan Username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              value={p}
              onChange={(e) => setP(e.target.value)}
              type="password"
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Masukkan Password"
            />
          </div>

          <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700">
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <a className="text-sm text-teal-600 hover:underline" href="#">Kontak Kami</a>
        </div>
      </div>
    </div>
  );
}
