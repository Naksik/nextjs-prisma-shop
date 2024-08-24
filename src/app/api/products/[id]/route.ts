import {NextRequest, NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma/prisma-client'
import {requestHandler} from '@/lib/api/requestHandler'
import {z} from 'zod'
import HttpStatusCode from '@/lib/api/httpStatusCode'
import {ZStringToInteger} from '@/lib/zod/ZStringToInteger'

interface ParamsGetProduct {
  id: string
}

interface ParamsDeleteProduct {
  id: string
}

const SCHEMA_PRODUCT_DELETE_PARAMS = z.object({
  id: ZStringToInteger(z.string().min(1, 'ID is required')),
})

const SCHEMA_PRODUCT_GET_PARAMS = z.object({
  id: ZStringToInteger(z.string().min(1, 'ID is required')),
})

export async function GET(
  request: NextRequest,
  {params}: {params: ParamsGetProduct},
) {
  const {id} = SCHEMA_PRODUCT_GET_PARAMS.parse(params)

  return await requestHandler(
    async () => {
      const product = await prisma.product.findUnique({
        where: {id},
      })

      if (!product) {
        return NextResponse.json(
          {
            error: 'Product Not Found',
            status: HttpStatusCode.NOT_FOUND,
          },
          {status: HttpStatusCode.NOT_FOUND},
        )
      }

      return NextResponse.json(product)
    },
    {request},
  )
}

export async function DELETE(
  request: NextRequest,
  {params}: {params: ParamsDeleteProduct},
) {
  const {id} = SCHEMA_PRODUCT_DELETE_PARAMS.parse(params)

  return await requestHandler(
    async () => {
      await prisma.product.delete({
        where: {id},
      })

      return new NextResponse(null, {status: HttpStatusCode.NO_CONTENT})
    },
    {request},
  )
}
