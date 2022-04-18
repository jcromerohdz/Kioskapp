import Head from 'next/head'
import Image from 'next/image'
import { PrismaClient } from '@prisma/client'

export default function Home({categories}) {
  console.log(categories)
  return (
		<h1>Next.js</h1>
  )
}

export const getServerSideProps = async () => {
  const prisma = new PrismaClient()

  const categories = await prisma.categoy.findMany()

  return {
    props: {
      categories
    },
  }

}