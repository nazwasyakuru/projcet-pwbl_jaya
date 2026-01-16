"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

type ActiveOrder = {
  id: number;
  name: string;
  serviceType: string;
  totalPrice: number;
  status: string;
  createdAt: string;
};

type DashboardSummary = {
  pesananMasuk: number;
  sedangDiproses: number;
  siapDiantar: number;
  pendapatanHariIni: number;
};

type DashboardData = {
  summary: DashboardSummary;
  activeOrders: ActiveOrder[];
};

export default function DashboardAdminPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        if (!token) {
          router.push("/loginadmin");
          return;
        }

        // Fetch data dashboard
        const dashboardData = await apiFetch("/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(dashboardData);
      } catch (err: any) {
        console.error("Dashboard Fetch Error:", err);
        setError(err.message || "Gagal memuat data dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  // Format angka ke Rupiah
  const formatRupiah = (value: number) =>
    "Rp " + value.toLocaleString("id-ID");

  // Helper untuk warna status (mirip dengan sebelumnya tapi menyesuaikan status backend)
  const getStatusColor = (status: string) => {
    // Mapping status backend ke warna visual
    // Backend Status: CREATED, CONFIRMED, PROCESSING, WASHING, DRYING, READY, COMLETED, CANCELED
    const s = status.toUpperCase();
    if (s === "CREATED" || s === "CONFIRMED") return "yellow";
    if (s === "PROCESSING" || s === "WASHING" || s === "DRYING") return "orange";
    if (s === "READY" || s === "COMPLETED") return "green";
    return "gray";
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold text-teal-600">Loading Dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gray-100 p-4">
        <div className="text-red-500 mb-4 font-medium">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-teal-600 text-white rounded shadow hover:bg-teal-700"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      {/*HEADER*/}
      <h1>Dashboard Admin</h1>
      <p className="subtitle">Ringkasan operasional laundry hari ini</p>

      {/*CARD RINGKASAN*/}
      <div className="cards">
        <div className="card">
          <p>Pesanan Masuk</p>
          <h2>{data?.summary.pesananMasuk || 0}</h2>
        </div>

        <div className="card">
          <p>Sedang Diproses</p>
          <h2>{data?.summary.sedangDiproses || 0}</h2>
        </div>

        <div className="card">
          <p>Siap Diantar</p>
          <h2>{data?.summary.siapDiantar || 0}</h2>
        </div>

        <div className="card">
          <p>Pendapatan</p>
          <h2>{formatRupiah(data?.summary.pendapatanHariIni || 0)}</h2>
        </div>
      </div>

      {/*TABEL PESANAN*/}
      <div className="table-card">
        <div className="table-header">
          <h3>Pesanan Aktif Terbaru</h3>

          <Link href="/dashboard/orders" className="link">
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
                <th>Layanan</th>
                <th>Total</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {data?.activeOrders.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>
                  <td>{order.name}</td>
                  <td>{order.serviceType}</td>
                  <td>{formatRupiah(order.totalPrice)}</td>

                  <td>
                    <span className={`status ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>

                  <td>
                    <Link href="/dashboard/orders" className="btn-link">
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
              {data?.activeOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    Tidak ada pesanan aktif saat ini.
                  </td>
                </tr>
              )}
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
