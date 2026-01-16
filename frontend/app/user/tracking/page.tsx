"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

// tipe data tracking
interface Track {
  id: number;
  status: string;
  timestamp: string;
  order: {
    id: number;
    name: string;
    serviceType: string;
    weight: number;
  };
}

// tipe data order dengan status terakhir
export default function TrackingPage() {
  const router = useRouter();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // fetch tracking data
    const fetchTracking = async () => {
      const token = localStorage.getItem("user_token");
      if (!token) {
        // Redirect if not logged in
        router.push("/loginuser");
        return;
      }

      try {
        const data = await apiFetch("/api/track", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Backend returns { tracks: [...] }
        setTracks(data.tracks || []);
      } catch (err) {
        console.error("Failed to fetch tracking:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTracking();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-sky-50 flex items-center justify-center">
        <p className="text-teal-600 font-semibold">Memuat data tracking...</p>
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-sky-50 px-4 py-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">

        {/*HEADER*/}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-semibold">Tracking Pesanan</h1>

          {/* Kembali ke Home User */}
          <Link
            href="/user"
            className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Kembali
          </Link>
        </div>

        {/*DESKTOP (TABLE)*/}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-sky-100 text-sm text-left">
                <th className="p-3">Nama</th>
                <th className="p-3">Paket</th>
                <th className="p-3">Berat</th>
                <th className="p-3">Catatan</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {userOrders.map((order) => (
                <tr key={order.id} className="border-b text-sm">
                  <td className="p-3">{order.nama}</td>
                  <td className="p-3">{order.paket}</td>
                  <td className="p-3">{order.berat} Kg</td>
                  <td className="p-3">{order.catatan || "-"}</td>

                  {/* STATUS (READ ONLY) */}
                  <td className="p-3">
                    <span className="px-3 py-1 rounded-full text-xs bg-teal-100 text-teal-700">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/*MOBILE (CARD)*/}
        <div className="md:hidden space-y-4">
          {userOrders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4">
              <p className="text-sm"><b>Nama:</b> {order.nama}</p>
              <p className="text-sm"><b>Paket:</b> {order.paket}</p>
              <p className="text-sm"><b>Berat:</b> {order.berat} Kg</p>
              <p className="text-sm"><b>Catatan:</b> {order.catatan || "-"}</p>

              <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs bg-teal-100 text-teal-700">
                {order.status}
              </span>
            </div>
          ))}
        </div>

      </div>
      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-500 py-8">
        © 2025 Clean Route Laundry
      </footer>
    </main>
  );
}
