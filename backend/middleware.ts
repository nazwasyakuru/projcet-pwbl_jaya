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
    
    // 1. Tangani Permintaan Pra-Penerbangan (OPSI)
    if (req.method === "OPTIONS") {
    console.log(`[MIDDLEWARE] Handling OPTIONS for ${req.nextUrl.pathname}`);
    return setCorsHeaders(new NextResponse(null, { status: 200 }));
    }
    // 2. Verifikasi Admin untuk Rute Admin
  if (req.nextUrl.pathname.startsWith("/api/admin")) {
    //Periksa otentikasi hanya jika BUKAN permintaan login/registrasi (meskipun admin biasanya tidak perlu mendaftar).
    // admin login ada di /api/admin/login
    if (!req.nextUrl.pathname.includes("/login")) {
        const user = verifyAdminEdge(req);
        //cek apakah user ada dan role nya admin
        if (!user || user.role !== "admin") {
            return setCorsHeaders(
          NextResponse.json(
              { message: "Unauthorized" },
            { status: 401 }
          )
        );
    }
 }
}

  // 3. Kembalikan respons tanpa modifikasi untuk permintaan lain
  const res = NextResponse.next();
  return setCorsHeaders(res);
}

export const config = {
  matcher: ["/api/:path*"],
};
