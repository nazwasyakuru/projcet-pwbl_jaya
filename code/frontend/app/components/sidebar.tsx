"use client";
import Link from "next/link";
export default function Sidebar() {
    return (
        <aside className="w-60 bg-white rounded p-4 shadow">
            <div className="mb-4 font-semibold">Menu</div>
            <ul className="space-y-2 text-sm">
                <li><Link href="/dashboard" className="block p-2 rounded hover:bg-gray-100">Dashboard</Link></li>
                <li><Link href="/orders" className="block p-2 rounded hover:bg-gray-100">Order</Link></li>
                <li><Link href="/employees" className="block p-2 rounded hover:bg-gray-100">Karyawan</Link></li>
                <li><Link href="/packages" className="block p-2 rounded hover:bg-gray-100">Paket</Link></li>
            </ul>
        </aside>
    );
}
