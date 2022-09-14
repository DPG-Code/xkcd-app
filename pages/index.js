import fs from 'fs/promises'
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';
import { Layout } from 'components/Layout';
import { useI18N } from 'context/i18n';

export default function Home({ latestComics }) {
  const { t } = useI18N()

  return (
    <>
      <Head>
        <title>XKCD - Comics</title>
        <meta name="description" content="Comics for developers" />
      </Head>

      <Layout>
        <h2>{t('LATEST_COMICS')}</h2>
        {
          latestComics.map(comic => (
            <Link href={`/comic/${comic.id}`} key={comic.id}>
              <a>
                <h3>{comic.title}</h3>
                <Image
                  width={comic.width}
                  height={comic.height}
                  objectFit='contain'
                  src={comic.img}
                  alt={comic.alt}
                />
              </a>
            </Link>
          ))
        }
      </Layout>
    </>
  )
}

export async function getStaticProps(context) {
  const files = await fs.readdir('./comics')
  const latestComicsFiles = files.slice(-10, files.length)

  const promisesReadFiles = latestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, 'utf8')
    return JSON.parse(content)
  })

  const latestComics = await Promise.all(promisesReadFiles)

  return {
    props: {
      latestComics
    }
  }
}
