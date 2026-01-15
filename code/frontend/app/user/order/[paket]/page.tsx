"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { userOrders } from "@/app/data/userOrders"; // SIMPAN ORDER

export default function FormOrderPage() {
    const params = useParams();
    const router = useRouter();
    // STATE UNTUK NOTIFIKASI BERHASIL
    const [success, setSuccess] = useState(false);
    const paket = params.paket as string;

    // Handle submit form
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;

        // Ambil data dari form
        const newOrder = {
            id: Date.now(), // ID unik
            nama: form.nama.value,
            paket: paket.replace("-", " "),
            berat: Number(form.berat.value),
            catatan: form.catatan.value,
            status: "Pesanan" as const, // Status awal
        };

        userOrders.push(newOrder);

        // Tampilkan notifikasi sukses
        setSuccess(true);

        // Reset form setelah submit
        form.reset();
    };

    return (
        <main className="min-h-screen bg-sky-50 px-4 py-6">
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    {/* Nama paket otomatis dari URL */}
                    <h1 className="text-lg font-semibold capitalize">
                        {paket.replace("-", " ")}
                    </h1>

                    <button
                        onClick={() => router.back()}
                        className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm"
                    >
                        Kembali
                    </button>
                </div>

                {/*NOTIFIKASI BERHASIL*/}
                {success && (
                    <div className="mb-6 p-4 rounded-md bg-green-100 text-green-700 flex items-center justify-between">
                        <span>✅ Pesanan berhasil dibuat</span>

                        {/* Tombol menuju halaman tracking */}
                        <button
                            onClick={() => router.push("/user/tracking")}
                            className="bg-green-600 text-white px-4 py-1 rounded-md text-sm"
                        >
                            Lihat Tracking
                        </button>
                    </div>
                )}


                {/* FORM ORDER */}
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <input name="nama" placeholder="Nama Lengkap" className="border p-3 rounded-md" required />
                    <input placeholder="No. HP" className="border p-3 rounded-md" required />
                    <input name="berat" type="number" placeholder="Berat (Kg)" className="border p-3 rounded-md" required />

                    <textarea
                        name="alamat"
                        placeholder="Alamat"
                        className="border p-3 rounded-md md:col-span-2"
                    />

                    <textarea
                        name="catatan"
                        placeholder="Catatan"
                        className="border p-3 rounded-md md:col-span-2"
                    />

                    <div className="md:col-span-2 flex justify-end">
                        <button className="bg-teal-600 text-white px-6 py-2 rounded-md">
                            Pesan
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
