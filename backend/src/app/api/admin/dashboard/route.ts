import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verifyAdmin } from "@/lib/auth";
import { cors } from "@/lib/cors";

const prisma = new PrismaClient();

export async function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }));
}

export async function GET(req: Request) {
  //  ADMIN AUTH
  const admin = verifyAdmin(req);
  if (!admin) {
    return cors(
      NextResponse.json(
      { message: "Unauthorized admin" },
      { status: 401 }
    )
   );
  }

  try {
    //  RANGE HARI INI
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    //  METRIC DASHBOARD
    const [
      totalOrders,
      processingOrders,
      readyOrders,
      todayIncome,
      activeOrders,
    ] = await Promise.all([
      // Pesanan Masuk
      prisma.order.count(),

      // Sedang Diproses
      prisma.order.count({
        where: {
          status: "PROCESSING",
        },
      }),

      // Siap Diantar
      prisma.order.count({
        where: {
          status: "READY",
        },
      }),

      // Pendapatan Hari Ini
      prisma.order.aggregate({
        _sum: {
          totalPrice: true,
        },
        where: {
          isPaid: true,
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      }),

      // Daftar Pesanan Aktif
      prisma.order.findMany({
        where: {
          status: {
            in: ["CREATED", "CONFIRMED", "PROCESSING", "READY"],
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
        select: {
          id: true,
          name: true,
          serviceType: true,
          totalPrice: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    return NextResponse.json(
      {
        summary: {
          pesananMasuk: totalOrders,
          sedangDiproses: processingOrders,
          siapDiantar: readyOrders,
          pendapatanHariIni: todayIncome._sum.totalPrice ?? 0,
        },
        activeOrders,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal mengambil data dashboard" },
      { status: 500 }
    );
  }
}
