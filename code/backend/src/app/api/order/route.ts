import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// ===== VERIFY TOKEN =====
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

// ===== CREATE ORDER =====
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
    };
   const { name, phone, address, serviceType, weight, totalPrice } = data;

    if (!name || !phone || !serviceType || !weight) {
      return NextResponse.json(
        { message: "Data wajib belum lengkap" },
        { status: 400 }men
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
