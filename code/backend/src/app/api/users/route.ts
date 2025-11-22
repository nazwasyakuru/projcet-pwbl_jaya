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

     // Validasi kosong
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Semua field wajib di isi" },
        { status: 400 }
      );
    }
    // Cek email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email sudah terdaftar" },
        { status: 400 }
      );
    }
      // 2. Validasi panjang password
    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password harus minimal 8 karakter" },
        { status: 400 }
      );
    }
    
       // 4. Cek username (name) sudah ada atau belum
    const nameExist = await prisma.user.findFirst({
      where: { name }
    });

    if (nameExist) {
      return NextResponse.json(
        { message: "Username sudah digunakan" },
        { status: 409 }
      );
    }
   // 5. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. Simpan ke database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });
 return NextResponse.json(
      {
        message: "User berhasil ditambahkan",
        user: newUser
      },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Gagal menambahkan user baru" },
      { status: 500 }
    );
  }
}
    