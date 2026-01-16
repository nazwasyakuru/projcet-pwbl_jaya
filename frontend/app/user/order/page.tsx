"use client";

import Image from "next/image";
import Link from "next/link";

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-sky-50 px-6 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-8">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-semibold">Tambah Order Baru</h1>

          <Link
            href="/user"
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Kembali
          </Link>
        </div>

        {/* PILIH PAKET */}
        <h2 className="text-center font-medium mb-6">Pilih Paket</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Cuci Komplit */}
          <div className="border rounded-lg p-6 text-center hover:shadow-lg cursor-pointer transition">
            <Image
              src="/img/cuci-komplit.jpg"
              alt="Cuci Komplit"
              width={120}
              height={120}
              className="mx-auto mb-4"
            />
            <p className="font-medium">Cuci Komplit</p>
          </div>

          {/* Dry Clean */}
          <div className="border rounded-lg p-6 text-center hover:shadow-lg cursor-pointer transition">
            <Image
              src="/img/dry-clean.jpg"
              alt="Dry Clean"
              width={120}
              height={120}
              className="mx-auto mb-4"
            />
            <p className="font-medium">Dry Clean</p>
          </div>

          {/* Cuci Satuan */}
          <div className="border rounded-lg p-6 text-center hover:shadow-lg cursor-pointer transition">
            <Image
              src="/img/cuci-satuan.jpg"
              alt="Cuci Satuan"
              width={120}
              height={120}
              className="mx-auto mb-4"
            />
            <p className="font-medium">Cuci Satuan</p>
          </div>

        </div>
      </div>
    </main>
  );
}
