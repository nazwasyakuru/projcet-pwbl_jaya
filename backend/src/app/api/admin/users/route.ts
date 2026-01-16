import { NextResponse } from "next/server";
import { PrismaClient, User } from "@prisma/client";
import { verifyAdmin } from "@/lib/auth";
import { cors } from "@/lib/cors";

const prisma = new PrismaClient();

// function options
export async function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }));
}

