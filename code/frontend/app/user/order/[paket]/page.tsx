"use client";

import { useParams, useRouter } from "next/navigation";

/**
 * Halaman form order
 * URL contoh: /user/order/cuci-komplit
 */
export default function FormOrderPage() {
    // mengambil parameter "paket" dari URL
    const params = useParams();
    const paket = params.paket as string;

    // Router untuk tombol kembali
    const router = useRouter();

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
                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                    >
                        Kembali
                    </button>
                </div>

                {/* FORM */}
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Nama */}
                    <input
                        type="text"
                        placeholder="Nama Lengkap"
                        className="border p-3 rounded-md"
                        required
                    />

                    {/* Telepon */}
                    <input
                        type="text"
                        placeholder="Nomor Telepon"
                        className="border p-3 rounded-md"
                        required
                    />

                    {/* Alamat */}
                    <textarea
                        placeholder="Alamat"
                        className="border p-3 rounded-md md:col-span-2"
                        rows={3}
                        required
                    />

                    {/* Berat */}
                    <input
                        type="number"
                        placeholder="Berat (Kg)"
                        className="border p-3 rounded-md"
                        required
                    />

                    {/* Tanggal masuk */}
                    <input
                        type="date"
                        className="border p-3 rounded-md"
                        required
                    />

                    {/* Tanggal keluar */}
                    <input
                        type="date"
                        className="border p-3 rounded-md"
                        required
                    />

                    {/* Catatan */}
                    <textarea
                        placeholder="Catatan (opsional)"
                        className="border p-3 rounded-md md:col-span-2"
                        rows={3}
                    />

                    {/* Tombol aksi */}
                    <div className="md:col-span-2 flex justify-end gap-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-md"
                        >
                            Pesan
                        </button>

                        <button
                            type="button"
                            className="bg-gray-200 px-6 py-2 rounded-md"
                            onClick={() => router.back()}
                        >
                            Batal
                        </button>
                    </div>

                </form>
            </div>
        </main>
    );
}
