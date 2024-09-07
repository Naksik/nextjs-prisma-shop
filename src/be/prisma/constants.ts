import {Prisma} from '@prisma/client'
import {hashSync} from 'bcrypt'

export const users: Prisma.UserCreateInput[] = [
  {
    name: 'John Doe',
    email: 'arcanen94@gmail.com',
    password: hashSync('1233456', 10),
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
