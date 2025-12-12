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
