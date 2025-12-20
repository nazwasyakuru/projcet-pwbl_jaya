"use client";

import Link from "next/link"; // ✅ TAMBAH
import { orders } from "@/app/data/orders"; // ✅ TAMBAH

type StatusPesanan =
  | "Penjemputan"
  | "Dicuci"
  | "Diproses"
  | "Siap Diantar"
  | "Selesai";

interface orders {
  id: number;
  nama: string;
  paket: string;
  total: number;
  status: StatusPesanan;
}

export default function DashboardPage() {
  // ❌ HAPUS DATA DUMMY orders DI SINI
  // const orders: Order[] = [ ... ];

  // ======================
  // LOGIC DASHBOARD (TETAP)
  // ======================
  const pesananMasuk = orders.length;

  const sedangDiproses = orders.filter(
    (o) => o.status === "Dicuci" || o.status === "Diproses"
  ).length;

  const siapDiantar = orders.filter(
    (o) => o.status === "Siap Diantar"
  ).length;

  const pendapatanHariIni = orders.reduce(
    (total, o) => total + o.total,
    0
  );

  const pesananAktif = orders.filter(
    (o) => o.status !== "Selesai"
  );

  const formatRupiah = (value: number) =>
    "Rp " + value.toLocaleString("id-ID");

  // ======================
  // UI
  // ======================
  return (
    <div className="container">
      <h1>Dashboard</h1>
      <p className="subtitle">Ringkasan operasional laundry</p>

      {/* CARD RINGKASAN */}
      <div className="cards">
        <div className="card">
          <p>Pesanan Masuk</p>
          <h2>{pesananMasuk}</h2>
        </div>

        <div className="card">
          <p>Sedang Diproses</p>
          <h2>{sedangDiproses}</h2>
        </div>

        <div className="card">
          <p>Siap Diantar</p>
          <h2>{siapDiantar}</h2>
        </div>

        <div className="card">
          <p>Pendapatan Hari Ini</p>
          <h2>{formatRupiah(pendapatanHariIni)}</h2>
        </div>
      </div>

      {/* TABEL PESANAN AKTIF */}
      <div className="table-card">
        <div className="table-header">
          <h3>Daftar Pesanan Aktif</h3>

          {/* 🔁 GANTI <a> */}
          <Link href="/orders" className="link">
            Lihat Semua Order
          </Link>
        </div>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nama</th>
              <th>Paket</th>
              <th>Total</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pesananAktif.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.nama}</td>
                <td>{order.paket}</td>
                <td>{formatRupiah(order.total)}</td>
                <td>
                  <span
                    className={`status ${
                      order.status === "Dicuci"
                        ? "yellow"
                        : order.status === "Diproses"
                        ? "orange"
                        : "green"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  {/* 🔁 GANTI <button> */}
                  <Link href="/orders" className="btn-link">
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* STYLE (TIDAK DIUBAH) */}
      <style jsx>{`
        .container {
          padding: 24px;
          background: #f1f5f9;
          min-height: 100vh;
        }

        h1 {
          font-size: 24px;
          font-weight: 600;
          color: #0d9488;
        }

        .subtitle {
          margin-bottom: 20px;
          color: #64748b;
        }

        .cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .card {
          background: white;
          padding: 16px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .card h2 {
          margin-top: 8px;
          font-size: 22px;
          font-weight: 600;
        }

        .table-card {
          background: white;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .link {
          color: #0d9488;
          font-size: 14px;
          cursor: pointer;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th,
        td {
          padding: 12px;
          font-size: 14px;
          border-bottom: 1px solid #e5e7eb;
        }

        .status {
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
        }

        .status.yellow {
          background: #fef3c7;
          color: #92400e;
        }

        .status.orange {
          background: #ffedd5;
          color: #9a3412;
        }

        .status.green {
          background: #dcfce7;
          color: #166534;
        }

        .btn-link {
          background: none;
          border: none;
          color: #0d9488;
          cursor: pointer;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
