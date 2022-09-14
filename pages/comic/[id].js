import { basename } from 'path'
import { readFile, stat, readdir } from 'fs/promises'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Layout } from 'components/Layout'

export default function Comic({ img, alt, title, width, height, prevId, nextId, hasPrev, hasNext }) {
  return (
    <>
      <Head>
        <title>XKCD - Comics</title>
        <meta name="description" content="Comics for developers" />
      </Head>

      <Layout>
        <h2>{title}</h2>
        <Image
          width={width}
          height={height}
          src={img}
          alt={alt}
        />
        <p>{alt}</p>

        {
          hasPrev && <Link href={`/comic/${prevId}`}>
            <a>Previous</a>
          </Link>
        }
        {
          hasNext && <Link href={`/comic/${nextId}`}>
            <a>Next</a>
          </Link>
        }
      </Layout>
    </>
  )
}

export async function getStaticPaths({ locales }) {
  const files = await readdir('./comics')
  let paths = []

  // locales --> ['en', 'es']
  locales.forEach(locale => {
    const pathsForLocale = files.map(file => {
      const id = basename(file, '.json')
      return { params: { id }, locale }
    })
    paths = [...paths, ...pathsForLocale]
  });

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { id } = params
  const content =  await readFile(`./comics/${id}.json`, 'utf8')
  const comic = JSON.parse(content)

  const idNumber = +id
  const prevId = idNumber - 1
  const nextId = idNumber + 1

  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`)
  ])

  const hasPrev = prevResult.status === 'fulfilled'
  const hasNext = nextResult.status === 'fulfilled'

  return {
    props: {
      ...comic,
      prevId,
      nextId,
      hasPrev,
      hasNext
    }
  }
}
