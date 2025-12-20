import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cors } from "@/lib/cors";

const prisma = new PrismaClient();

export async function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }));
}

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json() as { username: string; password: string };

    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return NextResponse.json({ message: "Admin tidak ditemukan" }, { status: 404 });
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return NextResponse.json({ message: "Password salah" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: "admin" },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return NextResponse.json({ message: "Login berhasil", token });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
