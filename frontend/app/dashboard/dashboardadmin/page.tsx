"use client";

import Link from "next/link";
import { orders } from "@/app/data/orders";

/*TIPE STATUS PESANAN*/
type StatusPesanan =
  | "Penjemputan"
  | "Dicuci"
  | "Diproses"
  | "Siap Diantar"
  | "Selesai";

/*TIPE DATA ORDER*/
interface orders {
  id: number;
  nama: string;
  paket: string;
  total: number;
  status: StatusPesanan;
}

export default function DashboardAdminPage() {
  /* LOGIC DATA DASHBOARD*/

  // Total seluruh pesanan
  const pesananMasuk = orders.length;

  // Pesanan yang sedang diproses
  const sedangDiproses = orders.filter(
    (o) => o.status === "Dicuci" || o.status === "Diproses"
  ).length;

  // Pesanan siap diantar
  const siapDiantar = orders.filter(
    (o) => o.status === "Siap Diantar"
  ).length;

  // Total pendapatan
  const pendapatanHariIni = orders.reduce(
    (total, o) => total + o.total,
    0
  );

  // Pesanan yang belum selesai
  const pesananAktif = orders.filter(
    (o) => o.status !== "Selesai"
  );

  // Format angka ke Rupiah
  const formatRupiah = (value: number) =>
    "Rp " + value.toLocaleString("id-ID");

  /*UI DASHBOARD*/
  return (
    <div className="container">
      {/*HEADER*/}
      <h1>Dashboard Admin</h1>
      <p className="subtitle">
        Ringkasan operasional laundry hari ini
      </p>

      {/*CARD RINGKASAN*/}
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
          <p>Pendapatan</p>
          <h2>{formatRupiah(pendapatanHariIni)}</h2>
        </div>
      </div>

      {/*TABEL PESANAN*/}
      <div className="table-card">
        <div className="table-header">
          <h3>Pesanan Aktif</h3>

          <Link
            href="/dashboard/orders"
            className="link"
          >
            Lihat Semua
          </Link>
        </div>

        {/*WRAPPER agar tabel bisa di-scroll di mobile*/}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>No</th>
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
                      className={`status ${order.status === "Dicuci"
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
                    <Link
                      href="/dashboard/orders"
                      className="btn-link"
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/*STYLE*/}
      <style jsx>{`
        /*CONTAINER*/
        .container {
          padding: 16px;
          background: #f1f5f9;
          min-height: 100vh;
        }

        /*JUDUL*/
        h1 {
          font-size: 22px;
          font-weight: 600;
          color: #0d9488;
        }

        .subtitle {
          margin-bottom: 20px;
          color: #64748b;
          font-size: 14px;
        }

        /*CARD GRID*/
        .cards {
          display: grid;
          /* auto-fit = otomatis menyesuaikan layar */
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 12px;
          margin-bottom: 20px;
        }

        .card {
          background: white;
          padding: 14px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .card h2 {
          margin-top: 6px;
          font-size: 20px;
          font-weight: 600;
        }

        /*TABLE CARD*/
        .table-card {
          background: white;
          border-radius: 8px;
          padding: 14px;
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
          font-size: 13px;
        }

        /*RESPONSIVE TABLE*/
        .table-wrapper {
          overflow-x: auto; /* scroll horizontal di mobile */
        }

        table {
          width: 100%;
          min-width: 600px; /*agar tabel tidak rusak di mobile*/
          border-collapse: collapse;
        }

        th,
        td {
          padding: 10px;
          font-size: 13px;
          border-bottom: 1px solid #e5e7eb;
          white-space: nowrap;
        }

        /*STATUS BADGE*/
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

        /*BUTTON*/
        .btn-link {
          color: #0d9488;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
