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
    const data = await req.json() as {
      email: string;
      password: string;
    };
    const { email, password } = data;

    if (!email || !password) {
      return cors(
        NextResponse.json(
          { message: "Email dan password wajib diisi" },
          { status: 400 }
        )
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return cors(
        NextResponse.json(
          { message: "User tidak ditemukan" },
          { status: 404 }
        )
      );
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return cors(
        NextResponse.json(
          { message: "Password salah" },
          { status: 401 }
        )
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET belum diset");
    }

    const token = jwt.sign(
      { id: user.id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return cors(
      NextResponse.json(
        { message: "Login berhasil", token },
        { status: 200 }
      )
    );
  } catch (err) {
    console.error("LOGIN USER ERROR:", err);
    return cors(
      NextResponse.json(
        { message: "Server error" },
        { status: 500 }
      )
    );
  }
}
