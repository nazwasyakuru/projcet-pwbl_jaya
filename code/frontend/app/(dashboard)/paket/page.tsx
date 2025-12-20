"use client";

import { useState, FormEvent } from "react";

interface Paket {
  id: number;
  nama: string;
  harga: number;
}

export default function Page() {
  const [data, setData] = useState<Paket[]>([
    { id: 1, nama: "Cuci Kering", harga: 5000 },
    { id: 2, nama: "Cuci Setrika", harga: 7000 },
  ]);

  const [form, setForm] = useState<{
    nama: string;
    harga: number | "";
  }>({
    nama: "",
    harga: "",
  });

  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (form.harga === "") {
      alert("Harga wajib diisi");
      return;
    }

    const payload: Paket = {
      id: editId ?? Date.now(),
      nama: form.nama,
      harga: Number(form.harga),
    };

    if (editId) {
      setData(data.map((item) => (item.id === editId ? payload : item)));
      setEditId(null);
    } else {
      setData([...data, payload]);
    }

    setForm({ nama: "", harga: "" });
  };

  const handleEdit = (item: Paket) => {
    setForm({
      nama: item.nama,
      harga: item.harga,
    });
    setEditId(item.id);
  };

  const handleDelete = (id: number) => {
    if (confirm("Yakin hapus paket?")) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  return (
    <>
      <div className="container">
        <h1>Manajemen Paket</h1>

        <form onSubmit={handleSubmit} className="card form">
          <input
            placeholder="Nama Paket"
            value={form.nama}
            onChange={(e) =>
              setForm({ ...form, nama: e.target.value })
            }
            required
          />

          <input
            type="number"
            inputMode="numeric"
            placeholder="Harga"
            value={form.harga}
            onChange={(e) => {
              const raw = e.target.value.replace(/\./g, "");
              setForm({
                ...form,
                harga: raw === "" ? "" : Number(raw),
              });
            }}
            required
          />

          <button className="btn-primary">
            {editId ? "Update" : "Tambah"}
          </button>
        </form>

        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Nama Paket</th>
                <th>Harga</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.nama}</td>
                  <td>Rp {item.harga.toLocaleString("id-ID")}</td>
                  <td>
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

      <style jsx>{`
        .container {
          padding: 24px;
          background: #f1f5f9;
          min-height: 100vh;
        }

        h1 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #0d9488;
        }

        .card {
          background: white;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          margin-bottom: 20px;
        }

        .form {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 12px;
        }

        input {
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
        }

        input:focus {
          outline: none;
          border-color: #0d9488;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead {
          background: #0d9488;
          color: white;
        }

        th,
        td {
          padding: 12px;
          font-size: 14px;
        }

        tbody tr:hover {
          background: #f0fdfa;
        }

        .btn-primary {
          background: #0d9488;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 6px;
          cursor: pointer;
        }

        .btn-edit {
          background: #f59e0b;
          color: white;
          border: none;
          padding: 6px 10px;
          border-radius: 4px;
          margin-right: 6px;
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
