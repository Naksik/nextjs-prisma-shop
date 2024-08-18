import {prisma} from './prisma-client'
import {categories, users} from './constants'

async function main() {
  await prisma.user.createMany({
    data: users,
  })

  await prisma.category.createMany({
    data: categories,
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
