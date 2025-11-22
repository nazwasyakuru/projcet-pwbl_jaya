import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// =========================
// GET: Ambil Semua Produk
// =========================
export async function GET() {
  try {
    const produk = await prisma.produk.findMany();
    return NextResponse.json(produk);
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal mengambil data produk" },
      { status: 500 }
    );
  }
}
// POST: Tambah Produk Baru
// =========================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { nama, harga, stok, deskripsi } = body;

    if (!nama || !harga || !stok) {
      return NextResponse.json(
        { message: "nama, harga, dan stok wajib diisi" },
        { status: 400 }
      );
    }