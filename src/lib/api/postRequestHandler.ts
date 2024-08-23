import {NextRequest, NextResponse} from 'next/server'
import HttpStatusCode from '@/lib/api/httpStatusCode'
import {z} from 'zod'

interface Options {
  request?: NextRequest
}

export async function postRequestHandler<T extends NextResponse>(
  callback: () => Promise<T>,
  options?: Options,
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

    return NextResponse.json(
      {
        error: 'Internal Server Error',
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      },
      {status: HttpStatusCode.INTERNAL_SERVER_ERROR},
    )
  }
}
