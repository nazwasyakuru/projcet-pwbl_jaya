import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminEdge } from "@/lib/edge-auth";

// Explicit CORS helper within middleware to ensure headers are always present
function setCorsHeaders(res: NextResponse) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return res;
}