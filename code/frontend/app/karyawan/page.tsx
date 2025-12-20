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

 