"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";


export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("ADMIN LOGIN SUBMIT");
    setError("");
    setLoading(true);

    try {
      const data = await apiFetch("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      localStorage.setItem("admin_token", data.token);

      router.push("/dashboard/dashboardadmin");

    } catch (err: any) {
      console.error("ADMIN LOGIN ERROR:", err);
      setError(err.message || "Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">
          Login Admin
        </h1>

        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Id
            </label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Masukkan username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Masukkan password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
