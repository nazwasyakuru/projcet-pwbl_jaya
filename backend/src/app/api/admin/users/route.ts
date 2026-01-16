import { NextResponse } from "next/server";
import { PrismaClient, User } from "@prisma/client";
import { verifyAdmin } from "@/lib/auth";
import { cors } from "@/lib/cors";

const prisma = new PrismaClient();

// function options
export async function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }));
}

// function get
export async function GET(req: Request) {
  //  ADMIN AUTH
    const admin = verifyAdmin(req);
    // unauthorized admin
    if (!admin) {
      return cors(
        NextResponse.json(
        { message: "Unauthorized admin" },
        { status: 401 }
      )
     );
    }
    // fetch users
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
            email: true,
            createdAt: true,
        },
      orderBy: {
        createdAt: "desc",
      },
    });
    // success
    return cors(NextResponse.json(users, { status: 200 }));
    }
}