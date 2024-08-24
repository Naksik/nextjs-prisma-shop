const DEFAULT_PAGE = '1'

const DEFAULT_PAGE_SIZE = '20'

export function createPagination(
  page = DEFAULT_PAGE,
  pageSize = DEFAULT_PAGE_SIZE,
  totalItems: number,
) {
  let pageAsNumber = parseInt(page, 10)
  let pageSizeAsNumber = parseInt(pageSize, 10)

  if (isNaN(pageAsNumber) || pageAsNumber < 1) {
    pageAsNumber = Number(DEFAULT_PAGE)
  }

  if (isNaN(pageSizeAsNumber) || pageSizeAsNumber < 1) {
    pageSizeAsNumber = Number(DEFAULT_PAGE_SIZE)
  }

  const totalPages = Math.ceil(totalItems / pageSizeAsNumber)
  const skip = (pageAsNumber - 1) * pageSizeAsNumber

  return {
    skip,
    take: pageSizeAsNumber,
    page: pageAsNumber,
    pageSize: pageSizeAsNumber,
    totalPages,
  }
}
