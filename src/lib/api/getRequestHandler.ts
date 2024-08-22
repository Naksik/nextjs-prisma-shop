import {NextResponse} from 'next/server'
import HttpStatusCode from '@/lib/api/httpStatusCode'

interface Options {
  request?: Request
}

export async function getRequestHandler<T extends NextResponse>(
  callback: () => Promise<T>,
  options?: Options,
) {
  try {
    return await callback()
  } catch (error) {
    console.error(error)

    return NextResponse.json({
      error: 'Internal Server Error',
      status: HttpStatusCode.INTERNAL_SERVER_ERROR,
    })
  }
}
