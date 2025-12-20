import { NextResponse } from "next/server";
import { PrismaClient, Prisma, Package } from "@prisma/client";
import { verifyAdmin } from "@/lib/auth";

const prisma = new PrismaClient();

//post
export async function POST(req: Request) {
  const user = verifyAdmin(req as any);

  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Admin only" }, { status: 403 });
  }

  const body = (await req.json()) as {
    serviceType: Package["serviceType"];
    label: string;
  };

  const pkg = await prisma.package.create({
    data: {
      serviceType: body.serviceType,
      label: body.label,
    },
  });

  return NextResponse.json(pkg, { status: 201 });
}


