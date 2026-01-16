"use client";

import Image from "next/image";
import Link from "next/link";

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-sky-50 px-4 py-6">
      {/* Container utama */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">

        {/*  HEADER  */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-semibold">Tambah Order Baru</h1>

          {/* Tombol kembali ke dashboard user */}
          <Link
            href="/user"
            className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Kembali
          </Link>
        </div>

        {/* JUDUL */}
        <h2 className="text-center font-medium mb-6">
          Pilih Paket Laundry
        </h2>

        {/*  GRID PAKET */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {/* PAKET 1 */}
          <Link
            href="/user/order/cuci-komplit"
            className="border rounded-lg p-6 text-center hover:shadow-lg transition"
          >
            <Image
              src="/img/cuci-komplit.jpg"
              alt="Cuci Komplit"
              width={120}
              height={120}
              className="mx-auto mb-4 object-contain"
            />
            <p className="font-medium">Cuci Komplit</p>
          </Link>

          {/* PAKET 2*/}
          <Link
            href="/user/order/dry-clean"
            className="border rounded-lg p-6 text-center hover:shadow-lg transition"
          >
            <Image
              src="/img/dry-clean.jpg"
              alt="Dry Clean"
              width={120}
              height={120}
              className="mx-auto mb-4 object-contain"
            />
            <p className="font-medium">Dry Clean</p>
          </Link>

          {/* PAKET 3 */}
          <Link
            href="/user/order/cuci-satuan"
            className="border rounded-lg p-6 text-center hover:shadow-lg transition"
          >
            <Image
              src="/img/cuci-satuan.jpg"
              alt="Cuci Satuan"
              width={120}
              height={120}
              className="mx-auto mb-4 object-contain"
            />
            <p className="font-medium">Cuci Satuan</p>
          </Link>
        </div>
      </div>
      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-500 py-8">
        © 2025 Clean Route Laundry
      </footer>
    </main>
  );
}
