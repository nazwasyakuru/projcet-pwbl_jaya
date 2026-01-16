import jwt from "jsonwebtoken";

interface TokenPayload {
  id: number;
  username: string;
  role: string;
}

export function verifyAdmin(req: Request): TokenPayload | null {
  const auth = req.headers.get("authorization");
  if (!auth) return null;

  const token = auth.split(" ")[1];
  if (!token) return null;

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as TokenPayload;

    if (payload.role !== "admin") return null;

    return payload;
  } catch {
    return null;
  }
}
