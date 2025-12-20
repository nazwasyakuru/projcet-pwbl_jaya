"use client";

import { orders } from "@/app/data/orders";

const formatRupiah = (value: number) =>
  "Rp " + value.toLocaleString("id-ID");

export default function OrdersPage() {
  return (
    <div className="container">
      <h1>Daftar Order</h1>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Paket</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.nama}</td>
                <td>{order.paket}</td>
                <td>{formatRupiah(order.total)}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .container {
          padding: 24px;
          background: #f1f5f9;
          min-height: 100vh;
        }
        .card {
          background: white;
          padding: 16px;
          border-radius: 8px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th,
        td {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
        }
      `}</style>
    </div>
  );
}
