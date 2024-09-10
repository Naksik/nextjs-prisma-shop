import {NextRequest, NextResponse} from 'next/server'
import {HttpStatusCode} from '@/server/constants/httpStatusCode'
import {z} from 'zod'
import {Prisma} from '@prisma/client'

interface Options {
  request: NextRequest
}

export async function requestHandler<T extends NextResponse>(
  callback: () => Promise<T>,
  options: Options,
) {
  try {
    return await callback()
  } catch (error) {
    console.error(error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {errors: error.errors, status: HttpStatusCode.BAD_REQUEST},
        {status: HttpStatusCode.BAD_REQUEST},
      )
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Error codes: https://www.prisma.io/docs/orm/reference/error-reference

      if (error.code === 'P2025') {
        return NextResponse.json(
          {
            error: error?.meta?.cause ?? 'Not Found',
            status: HttpStatusCode.NOT_FOUND,
          },
          {status: HttpStatusCode.NOT_FOUND},
        )
      }
    }

    return NextResponse.json(
      {
        error: 'Internal Server Error',
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      },
      {status: HttpStatusCode.INTERNAL_SERVER_ERROR},
    )
  }
}
