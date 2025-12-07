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

