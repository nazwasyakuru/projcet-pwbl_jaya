"use client";

import Link from "next/link";
export default function Navbar() {
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">CR</div>
                    <div>
                        <div className="font-semibold text-sm">Clean Route Laundry</div>
                        <div className="text-xs text-gray-500">Admin Panel</div>
                    </div>
                </div>
                <nav className="flex items-center gap-4 text-sm">
                    <Link href="/dashboard" className="text-gray-600 hover:text-teal-600">Dashboard</Link>
                    <Link href="/orders" className="text-gray-600 hover:text-teal-600">Pesanan</Link>


