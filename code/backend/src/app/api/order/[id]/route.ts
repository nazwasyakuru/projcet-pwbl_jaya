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

