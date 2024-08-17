import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma/prisma-client";

export async function GET() {
    try {
        const products = await prisma.product.findMany()

        return NextResponse.json(products)
    } catch (error) {
        return NextResponse.json({error: "Internal Server Error", status: 500}, {status: 500})
    }
}
