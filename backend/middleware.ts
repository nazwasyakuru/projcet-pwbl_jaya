import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminEdge } from "./lib/edge-auth";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api/admin")) {
    const user = verifyAdminEdge(req);

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*"],
};
