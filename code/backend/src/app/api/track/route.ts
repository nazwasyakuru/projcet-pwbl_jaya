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
        //cek order ada atau tidak
        const order = await prisma.order.findUnique({
            where: { id: orderId },
        });
        if (!order) {
            return NextResponse.json({ message: "Order tidak ditemukan" }, { status: 404 });
        }
        const tracking = await prisma.tracking.create({
            data: {
                orderId,
                status,
            },
        });
        return NextResponse.json(
            { message: "Tracking ditambahkan", tracking },
            { status: 201 }
        );
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}


// get tracking > ambil semua tracking terbaru berdasarkan orderId
export async function GET(req: Request) {
    try {
        const tracks = await prisma.tracking.findMany({
            orderBy: {timestamp: "desc"},
             include: {
                order: true,
            },
        });
        return NextResponse.json({tracks}, {status: 200});
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
    }
}