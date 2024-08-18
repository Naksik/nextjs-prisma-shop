import {Prisma} from '@prisma/client'
import {NextRequest, NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma/prisma-client'

export async function GET() {
  try {
    const products = await prisma.product.findMany()

    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({error: 'Internal Server Error', status: 500}, {status: 500})
  }
}

export interface ProductCreateRequest extends Omit<Prisma.ProductCreateInput, 'categories' | 'creator'> {
    creatorId: string
    categoryIds?: string[]
}

export async function POST(request: NextRequest) {
  try {
    const {name, price, status = false, creatorId, categoryIds}: ProductCreateRequest = await request.json()

    if (!name || !creatorId || !Array.isArray(categoryIds)) {
      return NextResponse.json({error: 'Missing required fields'}, {status: 400})
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        status,
        creatorId,
        categories: {
          create: categoryIds.map((categoryId: string) => ({
            categoryId,
            assignedById: creatorId,
          })),
        },
      },
    })

    return NextResponse.json(product, {status: 201})
  } catch (error) {
    return NextResponse.json({error: 'Bad Request', status: 400}, {status: 400})
  }
}
