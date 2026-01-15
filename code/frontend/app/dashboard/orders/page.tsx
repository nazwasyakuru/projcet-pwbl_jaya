"use client";

import { useState } from "react";
import { orders as initialOrders } from "@/app/data/orders";

/*TYPE STATUS PESANAN*/
type StatusPesanan =
  | "Penjemputan"
  | "Dicuci"
  | "Diproses"
  | "Siap Diantar"
  | "Selesai";

/*URUTAN STATUS (FLOW)*/
const statusFlow: StatusPesanan[] = [
  "Penjemputan",
  "Dicuci",
  "Diproses",
  "Siap Diantar",
  "Selesai",
];

/*FORMAT RUPIAH*/
const formatRupiah = (value: number) =>
  "Rp " + value.toLocaleString("id-ID");

export default function OrdersPage() {
  /*STATE LOKAL ORDER(supaya admin bisa ubah status tanpa reload)*/
  const [orders, setOrders] = useState(initialOrders);

  /*AMBIL STATUS BERIKUTNYA*/
  const nextStatus = (current: StatusPesanan): StatusPesanan => {
    const idx = statusFlow.indexOf(current);
    return idx < statusFlow.length - 1
      ? statusFlow[idx + 1]
      : current;
  };

  /*HANDLE BUTTON NEXT STATUS*/
  const handleNextStatus = (id: number) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, status: nextStatus(o.status) }
          : o
      )
    );
  };

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
