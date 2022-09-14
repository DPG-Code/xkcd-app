import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';
import { Layout } from 'components/Layout';
import { search } from 'services/search';
import { useI18N } from 'context/i18n';

export default function Search({ query, results }) {
  const { t } = useI18N()
  return (
    <>
      <Head>
        <title>{t('HEAD_TITLE', query)}</title>
        <meta name="description" content={`Comics for: ${query}`} />
      </Head>

      <Layout>
        <h2>{t('SEARCH_RESULT_TITLE', results.length, query)}</h2>

        {
          results.map(result => (
            <Link key={result.id} href={`comic/${result.id}`}>
              <a>
                <Image width='50' height='50' src={result.img} alt={result.alt} />
                <h2>{result.title}</h2>
              </a>
            </Link>
          ))
        }
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