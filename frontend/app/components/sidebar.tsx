"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();

  /*State untuk toggle sidebar di mobile, true  = sidebar terbuka,false = sidebar tertutup*/
  const [open, setOpen] = useState(false);

  /*Fungsi untuk cek menu aktif: aktif jika path sama,aktif juga jika sedang di sub-route*/
  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  return (
    <>
      {/*MOBILE BUTTON*/}
      {/*Tombol menu hanya muncul di layar kecil*/}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-teal-600 text-white px-3 py-2 rounded-md shadow"
      >
        ☰
      </button>

      {/*OVERLAY MOBILE*/}
      {/*Latar gelap saat sidebar terbuka di mobile*/}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/*SIDEBAR*/}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          w-60 bg-white p-4 shadow min-h-screen
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/*HEADER SIDEBAR*/}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-lg">Menu</h2>

          {/*Tombol close (hanya mobile)*/}
          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-gray-500 text-xl"
          >
            ✕
          </button>
        </div>

        {/*LIST MENU*/}
        <ul className="space-y-2 text-sm">
          {/*DASHBOARD*/}
          <li>
            <Link
              href="/dashboard/dashboardadmin"
              onClick={() => setOpen(false)}
              className={`block p-2 rounded ${isActive("/dashboard/dashboardadmin")
                  ? "bg-teal-100 text-teal-600 font-semibold"
                  : "hover:bg-gray-100"
                }`}
            >
              Dashboard
            </Link>
          </li>

          {/*ORDERS*/}
          <li>
            <Link
              href="/dashboard/orders"
              onClick={() => setOpen(false)}
              className={`block p-2 rounded ${isActive("/dashboard/orders")
                  ? "bg-teal-100 text-teal-600 font-semibold"
                  : "hover:bg-gray-100"
                }`}
            >
              Orders
            </Link>
          </li>

          {/*KARYAWAN*/}
          <li>
            <Link
              href="/dashboard/karyawan"
              onClick={() => setOpen(false)}
              className={`block p-2 rounded ${isActive("/dashboard/karyawan")
                  ? "bg-teal-100 text-teal-600 font-semibold"
                  : "hover:bg-gray-100"
                }`}
            >
              Karyawan
            </Link>
          </li>

          {/*PAKET*/}
          <li>
            <Link
              href="/dashboard/paket"
              onClick={() => setOpen(false)}
              className={`block p-2 rounded ${isActive("/dashboard/paket")
                  ? "bg-teal-100 text-teal-600 font-semibold"
                  : "hover:bg-gray-100"
                }`}
            >
              Paket
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}
