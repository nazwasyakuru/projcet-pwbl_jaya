import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

//CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3001",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// PRE-FLIGHT (WAJIB UNTUK BROWSER)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

//LOGIN USER
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      email: string;
      password: string;
    };

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email dan password wajib diisi" },
        { status: 400, headers: corsHeaders }
      );
    }

    // CARI USER BERDASARKAN EMAIL
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Email tidak ditemukan" },
        { status: 404, headers: corsHeaders }
      );
    }

    // CEK PASSWORD
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { message: "Password salah" },
        { status: 401, headers: corsHeaders }
      );
    }

    // BUAT JWT TOKEN USER
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: "user",
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return NextResponse.json(
      {
        message: "Login berhasil",
        token,
      },
      { headers: corsHeaders }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500, headers: corsHeaders }
    );
  }
}
