import Link from "next/link";

export default function DashboardPage() {
  const summary = [
    { title: "Pesanan Masuk", value: 12 },
    { title: "Sedang Diproses", value: 4 },
    { title: "Siap Diantar", value: 3 },
    { title: "Pendapatan Hari Ini", value: "Rp 1.200.000" },
  ];

  const recent = [
    { id: 1, name: "Ani", paket: "Reguler", total: 25000, status: "Dicuci" },
    { id: 2, name: "Budi", paket: "Express", total: 40000, status: "Diproses" },
  ];

  return (
    <div>
      {/* HEADER DASHBOARD */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-teal-600">
          Dashboard
        </h2>
        <p className="text-sm text-gray-500">
          Ringkasan operasional laundry
        </p>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {summary.map((s) => (
          <div key={s.title} className="bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-500">{s.title}</div>
            <div className="text-2xl font-bold mt-2">{s.value}</div>
          </div>
        ))}
      </div>

      {/* TABLE ORDER */}
      <div className="bg-white p-4 rounded shadow">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Daftar Pesanan Aktif</h3>

          {/* 🔗 INI LINK KE PAGE LAIN */}
          <Link
            href="/orders"
            className="text-sm text-teal-600"
          >
            Lihat Semua Order
          </Link>
        </div>

        <table className="w-full text-sm">
          <thead className="text-gray-500">
            <tr>
              <th className="text-left py-2">#</th>
              <th className="text-left py-2">Nama</th>
              <th className="text-left py-2">Paket</th>
              <th className="text-left py-2">Total</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((o) => (
              <tr key={o.id} className="border-t">
                <td className="py-2">{o.id}</td>
                <td>{o.name}</td>
                <td>{o.paket}</td>
                <td>Rp{o.total.toLocaleString("id-ID")}</td>
                <td>
                  <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800">
                    {o.status}
                  </span>
                </td>
                <td>
                  <Link
                    href={`/orders/${o.id}`}
                    className="text-teal-600"
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
  );
}
