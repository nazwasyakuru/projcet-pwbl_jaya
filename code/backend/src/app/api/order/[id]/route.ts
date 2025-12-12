import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface TokenPayload {
  id: number;
  username: string;
  role: string;
}

// ===== VERIFY TOKEN =====
function verifyToken(req: Request): TokenPayload | null {
  const auth = req.headers.get("authorization");
  if (!auth) return null;

  const token = auth.split(" ")[1];

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
  } catch {
    return null;
  }
}

// ===== GET ORDER DETAIL =====
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return NextResponse.json(
        { message: "Order tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Terjadi kesalahan" },
      { status: 500 }
    );
  }
}


type OrderUpdatePayload = {
  name?: string;
  phone?: string;
  address?: string;
  serviceType?: string;
  weight?: number;
  totalPrice?: number;
};

// ===== UPDATE ORDER =====
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = verifyToken(req);
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const id = Number(params.id);
    const updateData = await req.json() as OrderUpdatePayload;


    const order = await prisma.order.findUnique({ where: { id } });

    if (!order) {
      return NextResponse.json(
        { message: "Order tidak ditemukan" },
        { status: 404 }
      );
    }

    // CEGAH UPDATE JIKA SUDAH BAYAR
    if (order.isPaid === true) {
      return NextResponse.json(
        {
          message:
            "Order sudah dibayar, tidak bisa di-update. Silakan hubungi CS.",
        },
        { status: 403 }
      );
    }

    // USER TIDAK BOLEH UPDATE ORDER ORANG LAIN (kecuali admin)
   if (user.role !== "user") {
  // bukan admin → cek apakah order miliknya
  if (order.userId !== user.id) {
    return NextResponse.json(
      { message: "Kamu tidak punya akses ke order ini" },
      { status: 403 }
    );
  }

  // sudah dibayar → user tidak boleh update
  if (order.isPaid) {
    return NextResponse.json(
      { message: "Order sudah dibayar, tidak dapat diubah lagi" },
      { status: 403 }
    );
  }
}

    // ✔ UPDATE DIPERBOLEHKAN
    const updated = await prisma.order.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(
      { message: "Order diperbarui", order: updated },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Terjadi kesalahan" },
      { status: 500 }
    );
  }
}

