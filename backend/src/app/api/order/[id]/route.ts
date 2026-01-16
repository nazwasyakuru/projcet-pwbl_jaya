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
  const user = verifyToken(req);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = Number(params.id);
  const updateData = (await req.json()) as OrderUpdatePayload;

  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) {
    return NextResponse.json(
      { message: "Order tidak ditemukan" },
      { status: 404 }
    );
  }
  // CEGAH UPDATE JIKA SUDAH KONFIRMASI
  if (order.status !== "CREATED") {
  return NextResponse.json(
    { message: "Order sudah dikonfirmasi, tidak bisa diubah" },
    { status: 403 }
  );
}


  // === RULE USER ===
  if (user.role === "user") {
    if (order.userId !== user.id) {
      return NextResponse.json(
        { message: "Tidak punya akses ke order ini" },
        { status: 403 }
      );
    }

    if (order.isPaid) {
      return NextResponse.json(
        { message: "Order sudah dibayar, tidak bisa diubah" },
        { status: 403 }
      );
    }
  }

  // === ADMIN LEWAT SEMUA CHECK ===
  const updated = await prisma.order.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json(
    { message: "Order diperbarui", order: updated },
    { status: 200 }
  );
}

// ===== DELETE ORDER =====
export async function DELETE(
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

    const order = await prisma.order.findUnique({ where: { id } });

    if (!order) {
      return NextResponse.json(
        { message: "Order tidak ditemukan" },
        { status: 404 }
      );
    }

    //  CEGAH DELETE JIKA SUDAH BAYAR
    if (order.isPaid === true) {
      return NextResponse.json(
        {
          message:
            "Order sudah dibayar, tidak bisa dihapus. Silakan hubungi CS.",
        },
        { status: 403 }
      );
    }

    //  USER HANYA BISA HAPUS ORDER MILIKNYA SENDIRI (kecuali admin)
    if (user.role !== "admin" && user.id !== order.userId) {
      return NextResponse.json(
        { message: "Kamu tidak punya akses ke order ini" },
        { status: 403 }
      );
    }

    // DELETE DIPERBOLEHKAN
    await prisma.order.delete({ where: { id } });

    return NextResponse.json(
      { message: "Order dihapus" },
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
