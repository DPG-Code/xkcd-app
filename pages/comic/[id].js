import { basename } from 'path'
import { readFile, stat, readdir } from 'fs/promises'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Layout } from 'components/Layout'
import { ButtonPrevEnable, ButtonNextEnable, ButtonPrevDisable, ButtonNextDisable } from 'components/ButtonPrev'

export default function Comic({ img, alt, title, width, height, prevId, nextId, hasPrev, hasNext }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Head>

      <Layout>
        <section className='flex flex-col items-center justify-start'>
          <h2 className='my-6 w-10/12 text-center text-3xl font-bold'>{title}</h2>
          <div className='mx-8'>
            <Image
              width={width/1.8}
              height={height/1.8}
              src={img}
              alt={alt}
            />
          </div>
          <p className='mt-6 mb-10 w-10/12 text-center text-lg font-medium'>{alt}</p>
        </section>

        <section className='mb-10 w-full flex item-center justify-center gap-4'>
          {
            hasPrev
            ? <Link href={`/comic/${prevId}`}>
              <a>
                <ButtonPrevEnable />
              </a>
            </Link>
            : <ButtonPrevDisable />
          }
          {
            hasNext
            ? <Link href={`/comic/${nextId}`}>
              <a>
                <ButtonNextEnable />
              </a>
            </Link>
            : <ButtonNextDisable />
          }
        </section>
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
