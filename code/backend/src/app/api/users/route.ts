import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

// GET → Ambil semua user
export async function GET(req: Request) {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal mengambil data user" },
      { status: 500 }
    );
  }
}

// POST → Tambah user baru
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name: string;
      email: string;
      password: string;
    };
    const { name, email, password } = body;
  }
}