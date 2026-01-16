import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminEdge } from "@/lib/edge-auth";

// Fungsi pembantu CORS eksplisit di dalam middleware untuk memastikan header selalu ada.
function setCorsHeaders(res: NextResponse) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return res;
}

// middleware
export function middleware(req: NextRequest) {
  console.log(`[MIDDLEWARE] ${req.method} ${req.nextUrl.pathname}`);

  // 1. Handle Preflight Request (OPTIONS)
  if (req.method === "OPTIONS") {
    console.log(`[MIDDLEWARE] Handling OPTIONS for ${req.nextUrl.pathname}`);
    return setCorsHeaders(new NextResponse(null, { status: 200 }));
  }
}