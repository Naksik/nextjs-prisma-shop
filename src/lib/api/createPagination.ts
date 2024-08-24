interface Pagination {
  skip: number
  take: number
  page?: number
  pageSize?: number
  totalPages: number
}

export const DEFAULT_START_PAGE = 1

export const DEFAULT_PAGE_SIZE = 20

export function createPagination(
  page = DEFAULT_START_PAGE,
  pageSize = DEFAULT_PAGE_SIZE,
  totalItems: number,
): Pagination {
  if (isNaN(page) || page < 1) {
    page = DEFAULT_START_PAGE
  }

  if (isNaN(pageSize) || pageSize < 1) {
    pageSize = DEFAULT_PAGE_SIZE
  }

  const totalPages = Math.ceil(totalItems / pageSize)
  const skip = (page - 1) * pageSize

  return {
    skip,
    take: pageSize,
    page,
    pageSize,
    totalPages,
  }
}
