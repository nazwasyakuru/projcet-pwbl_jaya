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
        <h1>Manajemen Karyawan</h1>

        {/*FORM INPUT*/}
        <form onSubmit={handleSubmit} className="card form">
          <input
            placeholder="Nama Karyawan"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            required
          />

          <input
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <button className="btn-primary">
            {editId ? "Update Data" : "Tambah"}
          </button>
        </form>

        {/*ABLE DATA*/}
        <div className="card">
          {/* WRAPPER agar tabel bisa scroll di mobile */}
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nama}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td className="aksi">
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(item.id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/*STYLE*/}
      <style jsx>{`
        /*CONTAINER*/
        .container {
          padding: 16px;
          background: #f1f5f9;
          min-height: 100vh;
        }

        /*JUDUL*/
        h1 {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #0d9488;
        }

        /*CARD*/
        .card {
          background: white;
          border-radius: 8px;
          padding: 14px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          margin-bottom: 20px;
        }

        /*FORM*/
        .form {
          /* auto-fit + minmax → otomatis responsif */
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
        }

        input {
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
          font-size: 14px;
        }

        input:focus {
          outline: none;
          border-color: #0d9488;
        }

        /*TABLE RESPONSIVE*/
        .table-wrapper {
          overflow-x: auto; /* scroll horizontal di HP */
        }

        table {
          width: 100%;
          min-width: 600px; /* mencegah tabel hancur */
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
          white-space: nowrap; /* teks tidak turun */
        }

        tbody tr:hover {
          background: #f0fdfa;
        }

        /*BUTTON*/
        .btn-primary {
          background: #0d9488;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 10px;
          cursor: pointer;
          font-weight: 500;
        }

        .aksi {
          display: flex;
          gap: 6px;
        }

        .btn-edit {
          background: #f59e0b;
          color: white;
          border: none;
          padding: 6px 10px;
          border-radius: 4px;
        }

        .btn-delete {
          background: #dc2626;
          color: white;
          border: none;
          padding: 6px 10px;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
}
