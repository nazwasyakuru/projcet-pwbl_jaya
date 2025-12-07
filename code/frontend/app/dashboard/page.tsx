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


