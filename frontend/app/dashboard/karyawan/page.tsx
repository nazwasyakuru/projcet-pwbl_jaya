"use client";

import { useState, FormEvent } from "react";

/*TIPE DATA KARYAWAN Digunakan agar data konsisten*/
interface Karyawan {
  id: number;
  nama: string;
  username: string;
  email: string;
}

export default function Page() {
  /*STATE DATA KARYAWAN (Dummy sementara)*/
  const [data, setData] = useState<Karyawan[]>([
    { id: 1, nama: "Andi Wijaya", username: "andi", email: "andi@gmail.com" },
    { id: 2, nama: "Budi Santoso", username: "budi", email: "budi@gmail.com" },
  ]);

  /*STATE FORM INPUT id tidak ikut karena auto*/
  const [form, setForm] = useState<Omit<Karyawan, "id">>({
    nama: "",
    username: "",
    email: "",
  });

  /*STATE EDIT MODE null = tambah, ada id = edit*/
  const [editId, setEditId] = useState<number | null>(null);

  /*HANDLE SUBMIT FORM*/
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (editId) {
      // MODE EDIT DATA
      setData(
        data.map((item) =>
          item.id === editId ? { ...form, id: editId } : item
        )
      );
      setEditId(null);
    } else {
      // MODE TAMBAH DATA
      setData([...data, { ...form, id: Date.now() }]);
    }

    // Reset form setelah submit
    setForm({ nama: "", username: "", email: "" });
  };

  /*HANDLE EDIT BUTTON*/
  const handleEdit = (item: Karyawan) => {
    setForm(item);
    setEditId(item.id);
  };

  /*HANDLE DELETE*/
  const handleDelete = (id: number) => {
    if (confirm("Yakin hapus karyawan?")) {
      setData(data.filter((item) => item.id !== id));
    }
  };

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
