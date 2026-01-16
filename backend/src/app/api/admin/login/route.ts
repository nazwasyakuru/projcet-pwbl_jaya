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
    const body = await req.json();
    const { username, password } = body as { username: string; password: string };

    if (!username || !password) {
      return cors(
        NextResponse.json(
          { message: "Username dan password wajib diisi" },
          { status: 400 }
        )
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return cors(
        NextResponse.json(
          { message: "Admin tidak ditemukan" },
          { status: 404 }
        )
      );
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return cors(
        NextResponse.json(
          { message: "Password salah" },
          { status: 401 }
        )
      );
    }

    const token = jwt.sign(
      {
        id: Number(admin.id),
        username: admin.username,
        role: "admin",
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return cors(
      NextResponse.json(
        { message: "Login berhasil", token },
        { status: 200 }
      )
    );
  } catch (error) {
    console.error("ADMIN LOGIN ERROR:", error);
    return cors(
      NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      )
    );
  }
}
