import Link from "next/link";

export default function OrdersPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3 text-teal-600">
        Daftar Order
      </h2>

      <div className="bg-white shadow p-4 rounded">
        <Link
          href="/orders/1"
          className="block p-3 border-b hover:bg-gray-100"
        >
          Order #1 — Status: Penjemputan
        </Link>
      </div>
    </div>
  );
}
