import {Prisma} from '@prisma/client'

export const users: Prisma.UserCreateInput[] = [
  {
    name: 'John Doe',
    email: 'john@example.com',
  },
]

export const categories: Prisma.CategoryCreateInput[] = [
  {
    name: 'БАО',
  },
  {
    name: 'Шаверма',
  },
  {
    name: 'Чебуреки',
  },
  {
    name: 'ФРИ',
  },
  {
    name: 'SF Боксы',
  },
  {
    name: 'Напитки',
  },
]
