"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

type Order = {
  id: number;
  name: string;
  serviceType: string;
  totalPrice: number;
  status: string;
  createdAt: string;
};

/* FORMAT RUPIAH */
const formatRupiah = (value: number) =>
  "Rp " + value.toLocaleString("id-ID");

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* FETCH ORDERS */
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        if (!token) {
          router.push("/loginadmin");
          return;
        }

        const data = await apiFetch("/api/admin/orders", {
          headers: {
            Authorization: Bearer ${token},
          },
        });

        setOrders(data);
      } catch (err: any) {
        console.error("Fetch Orders Error:", err);
        setError(err.message || "Gagal memuat daftar pesanan.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  /* HELPER FOR STATUS BADGE COLOR */
  const getStatusColor = (status: string) => {
    const s = status.toUpperCase();
    if (s === "CREATED" || s === "CONFIRMED") return "yellow";
    if (s === "PROCESSING" || s === "WASHING" || s === "DRYING") return "orange";
    if (s === "READY" || s === "COMPLETED") return "green";
    return "gray";
  };

  /* HANDLE NEXT STATUS (TODO: Connect to Backend) */
  const handleNextStatus = async (id: number, currentStatus: string) => {
    alert("Fitur update status belum terhubung ke backend API.");
    // Implementasi nanti:
    // await apiFetch(/api/admin/orders/${id}/update, { method: 'PATCH', ... })
  };

  if (loading) {
    return (
      <div className="flex bg-gray-100 h-screen items-center justify-center">
        <div className="text-teal-600 font-semibold text-lg">Loading Orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex bg-gray-100 h-screen flex-col items-center justify-center p-4">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          Coba Lagi
        </button>
      </div>
    );
  }
  return (
    <div className="container">
      <h1>Daftar Order</h1>

      {/*DESKTOP VIEW (TABLE)*/}
      <div className="card desktop-only">
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Paket</th>
              <th>Total</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.nama}</td>
                <td>{order.paket}</td>
                <td>{formatRupiah(order.total)}</td>
                <td>
                  <span className="status">
                    {order.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn-primary"
                    onClick={() => handleNextStatus(order.id)}
                    disabled={order.status === "Selesai"}
                  >
                    {order.status === "Selesai"
                      ? "Selesai"
                      : "Next Status"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE VIEW (CARD LIST)*/}
      <div className="mobile-only">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="row">
              <span>Nama</span>
              <strong>{order.nama}</strong>
            </div>

            <div className="row">
              <span>Paket</span>
              <strong>{order.paket}</strong>
            </div>

            <div className="row">
              <span>Total</span>
              <strong>{formatRupiah(order.total)}</strong>
            </div>

            <div className="row">
              <span>Status</span>
              <span className="status">{order.status}</span>
            </div>

            <button
              className="btn-primary full"
              onClick={() => handleNextStatus(order.id)}
              disabled={order.status === "Selesai"}
            >
              {order.status === "Selesai"
                ? "Pesanan Selesai"
                : "Next Status"}
            </button>
          </div>
        ))}
      </div>

      {/*STYLE*/}
      <style jsx>{`
        /*CONTAINER*/
        .container {
          padding: 24px;
          background: #f1f5f9;
          min-height: 100vh;
        }

        h1 {
          color: #0d9488;
          margin-bottom: 16px;
        }

        /*CARD*/
        .card {
          background: white;
          padding: 16px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        /*TABLE*/
        table {
          width: 100%;
          border-collapse: collapse;
        }

        th,
        td {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
          font-size: 14px;
          text-align: left;
        }

        /*STATUS BADGE*/
        .status {
          padding: 4px 10px;
          border-radius: 999px;
          background: #dcfce7;
          color: #166534;
          font-size: 12px;
          font-weight: 500;
        }

        /*BUTTON*/
        .btn-primary {
          background: #0d9488;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
        }

        .btn-primary.full {
          width: 100%;
          margin-top: 12px;
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /*MOBILE CARD*/
        .order-card {
          background: white;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
          font-size: 14px;
        }

        /*RESPONSIVE*/
        .mobile-only {
          display: none;
        }

        @media (max-width: 768px) {
          .desktop-only {
            display: none;
          }

          .mobile-only {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}
