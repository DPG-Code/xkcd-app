import fs from 'fs/promises'
import Head from 'next/head'
import Link from 'next/link';
import { Layout } from 'components/Layout';
import { useI18N } from 'context/i18n';
import { Comic } from '../components/Comic'
import { Grid, Text } from "@nextui-org/react"

export default function Home({ latestComics }) {
  const { t } = useI18N()

  return (
    <>
      <Head>
        <title>XKCD - Comics</title>
        <meta name="description" content="Comics for developers" />
      </Head>

      <Layout>
        <Text
          className='my-6 text-center'
          h1 weight="bold" size={50}
          css={{
            textGradient: "45deg, $blue700 0%, $cyan600 100%",
          }}
        >
          {t('LATEST_COMICS')}
        </Text>
        <div className='mb-12'>
          <Grid.Container gap={2} justify="center">
            {
              latestComics.map(comic => (
                <Link href={`/comic/${comic.id}`} key={comic.id}>
                    <Grid>
                      <a>
                        <Comic
                          id={comic.id}
                          img={comic.img}
                          width={`${parseInt(comic.width/2)}px`}
                          height={`${parseInt(comic.height/2)}px`}
                          title={comic.title}
                          alt={comic.alt}
                          day={comic.day}
                          month={comic.month}
                          year={comic.year}
                        />
                      </a>
                    </Grid>
                </Link>
              ))
            }
          </Grid.Container>
        </div>
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
