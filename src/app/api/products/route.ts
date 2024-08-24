import {NextRequest, NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma/prisma-client'
import {requestHandler} from '@/lib/api/requestHandler'
import {z} from 'zod'
import {Prisma} from '@prisma/client'
import {getSearchParamsFromNextUrl} from '@/lib/api/getSearchParamsFromNextUrl'
import {createPagination} from '@/lib/api/createPagination'
import {ZStringToInteger} from '@/lib/zod/ZStringToInteger'
import HttpStatusCode from '@/lib/api/httpStatusCode'

interface RequestCreateProduct
  extends Omit<Prisma.ProductCreateInput, 'categories' | 'creator'> {
  creatorId: string
  categoryIds?: string[]
}

const SCHEMA_PRODUCT_CREATE_REQUEST = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.string(),
  status: z.boolean(),
  creatorId: ZStringToInteger(z.string().min(1, 'Creator ID is required')),
  categoryIds: z.array(ZStringToInteger(z.string())),
})

interface SearchParamsGetProduct {
  page: string
  pageSize: string
}

export async function GET(request: NextRequest) {
  const searchParams = getSearchParamsFromNextUrl<SearchParamsGetProduct>(
    request.nextUrl,
  )

  return await requestHandler(
    async () => {
      const totalProducts = await prisma.product.count()

      const {skip, take, totalPages, page, pageSize} = createPagination(
        searchParams.page,
        searchParams.pageSize,
        totalProducts,
      )

      const products = await prisma.product.findMany({
        skip,
        take,
      })

      return NextResponse.json({
        page,
        pageSize,
        totalPages,
        totalProducts,
        data: products,
      })
    },
    {request},
  )
}

export async function POST(request: NextRequest) {
  return await requestHandler(
    async () => {
      const body: RequestCreateProduct = await request.json()

      const {creatorId, categoryIds, ...validatedBody} =
        SCHEMA_PRODUCT_CREATE_REQUEST.parse(body)

      const products = await prisma.product.create({
        data: {
          ...validatedBody,
          creatorId,
          categories: {
            create: categoryIds.map((categoryId) => ({
              categoryId: categoryId,
              assignedById: creatorId,
            })),
          },
        },
      })

      return NextResponse.json(products, {status: HttpStatusCode.CREATED})
    },
    {request},
  )
}
