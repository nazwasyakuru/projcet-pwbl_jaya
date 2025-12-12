import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

//CHECK ADMIN TOKEN
function verifyAdmin(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth) return null;

  const token = auth.split(" ")[1];
  try {
    return jwt.verify(token, process.env.JWT_SECRET!); // return payload admin
  } catch {
    return null;
  }
}

// GET TRACKING BY ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const trackId = Number(params.id);

    const tracking = await prisma.tracking.findUnique({
      where: { id: trackId },
      include: {
        order: true,
      },
    });

    if (!tracking) {
      return NextResponse.json({ message: "Tracking tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ tracking });
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil tracking" }, { status: 500 });
  }
}
