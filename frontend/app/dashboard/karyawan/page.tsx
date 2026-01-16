"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

/*TIPE DATA users*/
interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  createdAt: string;
}

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // fetch data users
  useEffect(() => {
    // fungsi fetch users
    const fetchUsers = async () => {
      try {
        // ambil token dari localStorage
        const token = localStorage.getItem("admin_token");
        if (!token) {
          router.push("/loginadmin");
          return;
        }
        // fetch users dari API
        const users = await apiFetch("/api/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(users);
      } catch (err: any) {
        console.error("Fetch Users Error:", err);
        setError(err.message || "Gagal memuat data karyawan.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [router]);
  
  // handle form submit
  if (loading) {
    return (
    <div className="flex bg-grey-100 h-screen flex-col items-center justify-center">
      <div className="text-teal-600 font-semibold text-lg">Loading Users</div>
    </div>
    );
  }

  // handle form submit
  if (error) {
    return (
      <div className="flex bg-grey-100 h-screen flex-col items-center justify-center">
        <div className="text-red-600 font-semibold text-lg">{error}</div>
        <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">Coba Lagi
            </button>
      </div>
    );
  }

  /*UI*/
  return (
    <>
      <div className="container">
        <h1>Data User (Pelanggan)</h1>

        {/* INFO CARD */}
        <div className="card mb-4">
          <p className="text-sm text-gray-600">
            Halaman ini menampilkan daftar user yang terdaftar di aplikasi.
          </p>
        </div>

        {/* TABLE DATA */}
        <div className="card">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Tanggal Daftar</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>#{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{new Date(item.createdAt).toLocaleDateString("id-ID")}</td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-500">
                      Belum ada user terdaftar.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* STYLE */}
      <style jsx>{`
        /* CONTAINER */
        .container {
          padding: 16px;
          background: #f1f5f9;
          min-height: 100vh;
        }

        h1 {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #0d9488;
        }

        /* CARD */
        .card {
          background: white;
          border-radius: 8px;
          padding: 14px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .mb-4 {
          margin-bottom: 16px;
        }

        .text-sm {
          font-size: 14px;
        }
        
        .text-gray-600 {
          color: #475569;
        }

        /* TABLE RESPONSIVE */
        .table-wrapper {
          overflow-x: auto;
        }

        table {
          width: 100%;
          min-width: 600px;
          border-collapse: collapse;
        }

        thead {
          background: #0d9488;
          color: white;
        }

        th,
        td {
          padding: 10px;
          font-size: 13px;
          text-align: left;
          white-space: nowrap;
          border-bottom: 1px solid #e2e8f0;
        }

        tbody tr:hover {
          background: #f0fdfa;
        }
      `}</style>
    </>
  );
}