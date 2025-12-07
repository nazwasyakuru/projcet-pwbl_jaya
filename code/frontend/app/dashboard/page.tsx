import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Link from "next/link";

export default function DashboardPage() {
    // mock data singkat — nanti akan diisi dari API
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
            <Navbar />
            <main className="max-w-7xl mx-auto p-6 grid grid-cols-5 gap-6">
                <aside className="col-span-1">
                    <Sidebar />
                </aside>
                <section className="col-span-4">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold">Dashboard</h2>
                        <p className="text-sm text-gray-500">Ringkasan operasional laundry</p>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        {summary.map((s) => (
                            <div key={s.title} className="bg-white p-4 rounded shadow">
                                <div className="text-sm text-gray-500">{s.title}</div>
                                <div className="text-2xl font-bold mt-2">{s.value}</div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold">Daftar Pesanan Aktif</h3>
                            <Link href="/orders/new" className="text-sm text-teal-600">Buat Order Baru</Link>
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





