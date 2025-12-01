import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// verify JWT token
function verifyToken(req: Request) {
    const auth = req.headers.get("authorization");
    if (!auth) return null;
    const token = auth.split(" ")[1];
    try {
        return jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
        return null;
    }
}

// tambah tracking admin
export async function POST(req: Request) {
    try {
        const user = verifyToken(req); 
        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const data = (await req.json()) as {
            orderId: number;
            status: string;
        };
        const { orderId, status } = data;
        if (!orderId || !status) {
            return NextResponse.json(
                { message: "status track wajib di isi" },
                { status: 400 }
            );
        }
        
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}


