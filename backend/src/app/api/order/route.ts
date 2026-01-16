import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// VERIFY TOKEN
function verifyToken(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth) return null;
  const token = auth.split(" ")[1];
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return null;
  }
}

// CREATE ORDER 
export async function POST(req: Request) {
  try {
    const user = verifyToken(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // TYPE agar tidak error
    const data = (await req.json()) as {
      name: string;
      phone: string;
      address: string;
      serviceType: string;
      weight: number;
      totalPrice?: number;
      status?: string;
    };
   const { name, phone, address, serviceType, weight, totalPrice } = data;

    if (!name || !phone || !serviceType || !weight) {
      return NextResponse.json(
        { message: "Data wajib belum lengkap" },
        { status: 400 }
      );
    }
     
    // cegah order duplikat: cek apakah ada order dengan nama, phone, dan address yang sama dalam 1 jam terakhir
    const existingOrder = await prisma.order.findFirst({
  where: {
    phone,
    serviceType,
    isPaid: false,      // aturan: belum dibayar tidak boleh buat duplikat
  },
});

if (existingOrder) {
  return NextResponse.json(
    { message: "Order dengan layanan dan nomor ini sudah ada" },
    { status: 409 }
  );
}

    const newOrder = await prisma.order.create({
      data: {
        name,
        phone,
        address,
        serviceType,
        weight,
        totalPrice: totalPrice ?? 0, // default
        isPaid: false,
      },
    });
       return NextResponse.json(
      { message: "Order dibuat", order: newOrder },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Terjadi kesalahan" },
      { status: 500 }
    );
  }
}

// ===== GET ALL ORDERS =====
export async function GET(req: Request) {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ orders }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Gagal mengambil orders" },
      { status: 500 }
    );
  }
}