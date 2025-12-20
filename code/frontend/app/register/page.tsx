"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL = "http://localhost:3000/api";

export default function RegisterPage() {
    const router = useRouter();
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${API_URL}/users/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nama, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Register gagal");
                return;
            }

            alert("Registrasi berhasil, silakan login");
            router.push("/loginuser");
        } catch {
            setError("Gagal menghubungi server");
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
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        required
                    />
                    