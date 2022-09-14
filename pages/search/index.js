import Head from 'next/head'
import Link from 'next/link';
import { Layout } from 'components/Layout';
import { ComicResult } from 'components/ComicResult';
import { search } from 'services/search';
import { useI18N } from 'context/i18n';
import { Text } from "@nextui-org/react"

export default function Search({ query, results }) {
  const { t } = useI18N()
  return (
    <>
      <Head>
        <title>{t('HEAD_TITLE', query)}</title>
        <meta name="description" content={`Comics for: ${query}`} />
      </Head>

      <Layout>
        <Text color="default" h2 className='mt-6 mb-10 text-center text-3xl font-semibold'>{t('SEARCH_RESULT_TITLE', results.length, query)}</Text>

        <div className='w-full flex flex-col items-center justify-start gap-4'>
          {
            results.map(result => (
              <Link key={result.id} href={`comic/${result.id}`}>
                <a className='w-72'>
                  <ComicResult
                    img={result.img}
                    alt={result.alt}
                    title={result.title}
                    day={result.day}
                    month={result.month}
                    year={result.year}
                  />
                </a>
              </Link>
            ))
          }
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { query } = context
  const { q = '' } = query

  const { results } = await search({ query: q })

  return {
    props: {
      query: q,
      results
    }
  }
}