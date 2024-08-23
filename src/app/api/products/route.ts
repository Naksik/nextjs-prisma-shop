import {Prisma} from '@prisma/client'
import {NextRequest, NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma/prisma-client'
import {getRequestHandler} from '@/lib/api/getRequestHandler'
import {postRequestHandler} from '@/lib/api/postRequestHandler'
import {z} from 'zod'

export interface RequestProductCreate
  extends Omit<Prisma.ProductCreateInput, 'categories' | 'creator'> {
  creatorId: string
  categoryIds?: string[]
}

export interface RequestProductDelete {
  id: string
}

const SCHEMA_PRODUCT_CREATE_REQUEST = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.string(),
  status: z.boolean(),
  creatorId: z.string().min(1, 'Creator ID is required'),
  categoryIds: z.array(z.string()),
})

export async function GET() {
  return await getRequestHandler(async () => {
    const products = await prisma.product.findMany()

    return NextResponse.json(products)
  })
}

export async function POST(request: NextRequest) {
  return await postRequestHandler(async () => {
    const body: RequestProductCreate = await request.json()
    const {categoryIds, ...validatedBody} =
      SCHEMA_PRODUCT_CREATE_REQUEST.parse(body)

    const products = await prisma.product.create({
      data: {
        ...validatedBody,
        categories: {
          create: categoryIds.map((categoryId) => ({
            categoryId,
            assignedById: validatedBody.creatorId,
          })),
        },
      },
    })

    return NextResponse.json(products)
  })
}

export async function DELETE(request: NextRequest) {
  return await postRequestHandler(async () => {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get('id') ?? 'N/A'

    await prisma.product.delete({
      where: {id},
    })

    return new NextResponse(null, {status: 204})
  })
}
