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