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

const produk = await prisma.produk.create({
      data: { nama, harga, stok, deskripsi },
    });

    return NextResponse.json(
      { message: "Produk berhasil ditambahkan", produk },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal menambahkan produk" },
      { status: 500 }
    );
  }
}
// =========================
// PUT: Update Produk per ID
// =========================
export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const id = Number(url.searchParams.get("id"));

    if (!id) {
      return NextResponse.json(
        { message: "ID produk tidak ditemukan" },
        { status: 400 }
      );
    }
  
const body = await req.json();

    const produk = await prisma.produk.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(
      { message: "Produk berhasil diperbarui", produk },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal memperbarui produk" },
      { status: 500 }
    );
  }
}