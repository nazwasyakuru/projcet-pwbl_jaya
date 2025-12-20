"use client";

import { useState, FormEvent } from "react";

interface Karyawan {
    id: number;
    nama: string;
    username: string;
    email: string;
}

export default function Page() {
    const [data, setData] = useState<Karyawan[]>([
        { id: 1, nama: "Andi Wijaya", username: "andi", email: "andi@gmail.com" },
        { id: 2, nama: "Budi Santoso", username: "budi", email: "budi@gmail.com" },
    ]);

    const [form, setForm] = useState<Omit<Karyawan, "id">>({
        nama: "",
        username: "",
        email: "",
    });

    const [editId, setEditId] = useState<number | null>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (editId) {
            setData(
                data.map((item) =>
                    item.id === editId ? { ...form, id: editId } : item
                )
            );
            setEditId(null);
        } else {
            setData([...data, { ...form, id: Date.now() }]);
        }

        setForm({ nama: "", username: "", email: "" });
    };

    const handleEdit = (item: Karyawan) => {
        setForm(item);
        setEditId(item.id);
    };

    const handleDelete = (id: number) => {
        if (confirm("Yakin hapus karyawan?")) {
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
                        onChange={(e) => setForm({ ...form, nama: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Harga"
                        value={form.harga}
                        onChange={(e) =>
                            setForm({ ...form, harga: Number(e.target.value) })
                        }
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
                                    <td>Rp {item.harga}</td>
                                    <td>
                                        <button className="btn-edit" onClick={() => handleEdit(item)}>
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

        .btn-primary {
          background: #0d9488;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 6px;
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
