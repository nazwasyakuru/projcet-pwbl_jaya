"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-teal-600 p-4 text-white flex items-center justify-between">
      <h1 className="text-lg font-bold">Clean Route Laundry</h1>
      <div className="flex gap-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/orders">Orders</Link>
        <Link href="/login">Logout</Link>
      </div>
    </nav>
  );
}
