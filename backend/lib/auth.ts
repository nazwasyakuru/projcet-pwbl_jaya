import jwt from "jsonwebtoken";

interface TokenPayload {
  id: number;
  username: string;
  role: string;
}

// Fungsi untuk memverifikasi token admin dari header Authorization
export function verifyAdmin(req: Request): TokenPayload | null {
  const auth = req.headers.get("authorization");
  // Jika tidak ada header Authorization, kembalikan null
  if (!auth) return null;
  // Ekstrak token dari header (format: "Bearer
  const token = auth.split(" ")[1];
  if (!token) return null;
  // Verifikasi token JWT
    try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as TokenPayload;
    console.log("AUTH PAYLOAD:", payload);
    // Pastikan peran adalah admin
    if (payload.role !== "admin") {
      console.log("ROLE MISMATCH:", payload.role);
      return null;
    }

    return payload;
  } catch (e) {
    console.error("VERIFY TOKEN ERROR:", e);
    return null;
  }
}

